import asyncio
import os
import sys
from pathlib import Path

import joblib
import numpy as np
from brownie import accounts
from coincurve import PrivateKey
from dotenv import load_dotenv
from sklearn import datasets
from web3.middleware import construct_sign_and_send_raw_middleware

from felt.core.average import average_models
from felt.core.contracts import to_dict
from felt.core.storage import ipfs_download_file, ipfs_upload_file
from felt.core.web3 import (
    decrypt_secret,
    encrypt_bytes,
    encrypt_secret,
    get_current_secret,
    get_project_contract,
    get_web3,
)

# Load dotenv at the beginning of the program
load_dotenv()

# Connect to application running on this server itself and coordinate tasks
ENDPOINT = "localhost:8000"
PROTOCOL = "http://"
WS = "ws://"

LOGS = Path(__file__).parent / "logs" / sys.argv[1]


async def get_plan(project_contract):
    """Get latest running plan else return None."""
    if (
        project_contract.functions.isNewPlan().call()
        and project_contract.functions.isPlanRunning().call()
    ):
        length = project_contract.functions.getPlansLength().call()
        plan = project_contract.functions.plans(length - 1).call()
        return to_dict(plan, "TrainingPlan")
    return None


def get_node_secret(project_contract, account):
    index = project_contract.functions.nodes(account.address).call()
    assert (
        index >= 3
    ), f"Node with this address ({account.address}) isn't approved by contract."

    node = project_contract.functions.nodesArray(index - 3).call()
    node = to_dict(node, "Node")

    ct = node["secret0"] + node["secret1"] + node["secret2"]
    return decrypt_secret(ct, node["parity"], account.private_key[2:]), node


async def upload_encrypted_model(model, model_path, secret):
    """Encrypt and upload model to IPFS.

    Args:
        ...

    Returns:
        (str): CID of uploaded file.
    """
    enc_model_path = model_path.parent / f"enc_node_model.joblib"
    # TODO: Optimize this part, so we don't need to r/w so many times
    joblib.dump(model, model_path)
    with open(model_path, "rb") as f:
        encrypted_model = encrypt_bytes(f.read(), secret)

    with open(enc_model_path, "wb") as f:
        f.write(encrypted_model)

    # 4. Upload file to IPFS
    with open(enc_model_path, "rb") as f:
        res = await ipfs_upload_file(f)
    return res.json()["cid"]


async def execute_rounds(
    X, y, model, plan, plan_dir, secret, account, project_contract, w3
):
    """Perform training rounds according to the training plan.

    Args:
        ...

    Returns:
        (object): scikit-learn model
    """
    num_rounds = plan["numRounds"]
    for i in range(num_rounds):
        print(f"\nRunning round {i}")
        round_dir = plan_dir / f"round_{i}"
        round_dir.mkdir(exist_ok=True)

        # 2. Execute training
        print("Training")
        model.fit(X, y)

        # 3. Encrypt the model
        model_path = round_dir / f"node_model.joblib"
        cid = await upload_encrypted_model(model, model_path, secret)

        # 5. Send model to the contract (current round)
        tx = project_contract.functions.submitModel(cid).transact(
            {"from": account._acct.address, "gas": 10 ** 6}
        )
        tx_r = w3.eth.wait_for_transaction_receipt(tx)

        # 6. Download models and wait for round finished
        models = [model]
        downloaded = set()
        print("Waiting for other models to finish round.")
        while len(models) < plan["numNodes"]:
            length = project_contract.functions.getNodesLength().call()
            for node_idx in range(length):
                node = project_contract.functions.nodesArray(node_idx).call()
                node = to_dict(node, "Node")
                if (
                    node_idx in downloaded
                    or not node["activated"]
                    or node["_address"] == account.address
                ):
                    continue

                cid = project_contract.functions.getRoundModel(
                    i, node["_address"]
                ).call()
                if len(cid) < 5:
                    continue
                print(f"CID from node {node_idx}", cid)

                m_path = round_dir / f"model_node_{node_idx}.joblib"
                await ipfs_download_file(cid, m_path, secret)
                models.append(joblib.load(m_path))
                downloaded.add(node_idx)

        print("Averaging models.", len(models))
        # 7. Average models
        model = average_models(models)
    return model


async def task(key):
    account = accounts.add(key)

    # TODO: Proper data - this is only for demonstration
    X, y = datasets.load_diabetes(return_X_y=True)
    subset = np.random.choice(X.shape[0], 100, replace=False)
    X, y = X[subset], y[subset]

    w3 = get_web3()
    acct = account._acct
    w3.middleware_onion.add(construct_sign_and_send_raw_middleware(acct))
    w3.eth.default_account = acct.address
    print("Worker connected to chain id: ", w3.eth.chain_id)
    contracts = get_project_contract(w3)
    project_contract = contracts["ProjectContract"]

    # Obtain secret from the contract
    SECRET, node = get_node_secret(project_contract, account)

    while True:
        plan = await get_plan(project_contract)
        if plan is None:
            await asyncio.sleep(3)
            print("Waiting for a plan.")
            continue

        print("Executing a plan!")
        # Use random seed from contract
        np.random.seed(plan["randomSeed"])

        secret = get_current_secret(SECRET, node["entryKeyTurn"], plan["keyTurn"])
        print("Node secret", secret)

        # Creat directory for storing plan
        plan_index = project_contract.functions.getPlansLength().call()
        plan_dir = LOGS / f"plan_{plan_index}"
        plan_dir.mkdir(parents=True, exist_ok=True)

        # 1. Download model by CID
        base_model_path = plan_dir / "base_model.joblib"
        await ipfs_download_file(plan["baseModelCID"], output_path=base_model_path)
        model = joblib.load(base_model_path)

        final_model = await execute_rounds(
            X, y, model, plan, plan_dir, secret, account, project_contract, w3
        )
        print("Creating final model.")
        final_model_path = plan_dir / "final_model.joblib"
        joblib.dump(model, final_model_path)

        # 8. Upload final model if coordinator
        if plan["finalNode"] == account.address:
            print("Node selected as a final one.")
            # Generate builder secret based on random seed and secret
            # So it is same for all nodes
            bs = int.from_bytes(secret, "big") * plan["randomSeed"]
            builder_secret = bs.to_bytes((bs.bit_length() + 7) // 8, "big")[-32:]

            cid = await upload_encrypted_model(
                final_model, final_model_path, builder_secret
            )

            builder = project_contract.functions.builders(plan["creator"]).call()
            builder = to_dict(builder, "Builder")
            parity, ciphertext = encrypt_secret(
                builder_secret, builder["parity"], builder["publicKey"]
            )

            project_contract.functions.finishPlan(parity, *ciphertext, cid).transact(
                {"from": account._acct.address, "gas": 10 ** 6}
            )
            print("Final model uploaded and encrypted for a builder.")

        await asyncio.sleep(30)
        print("Plan finished!")


def main():
    key = sys.argv[1]
    if key == "main":
        key = os.environ["PRIVATE_KEY"]
    elif key == "node1":
        key = os.environ["NODE1_PRIVATE_KEY"]
    elif key == "node2":
        key = os.environ["NODE2_PRIVATE_KEY"]

    asyncio.run(task(key))


if __name__ == "__main__":
    main()
