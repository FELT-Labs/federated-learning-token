import asyncio
from pathlib import Path

import joblib
import numpy as np
from dotenv import load_dotenv

from felt.core.average import average_models
from felt.core.storage import ipfs_download_file, ipfs_upload_file
from felt.core.web3 import decrypt_secret, encrypt_bytes, get_project_contract, get_web3

# Load dotenv at the beginning of the program
load_dotenv()

# Connect to application running on this server itself and coordinate tasks
ENDPOINT = "localhost:8000"
PROTOCOL = "http://"
WS = "ws://"

LOGS = Path(__file__).parent / "logs"


async def get_plan(project_contract):
    if project_contract.functions.isNewPlan().call():
        length = project_contract.functions.getPlansLength().call()
        plan = project_contract.functions.plans(length - 1).call()
        return plan
    return None


async def task():
    # TODO: Load data
    X, y = [], []

    w3 = get_web3()
    print("Worker connected to chain id: ", w3.eth.chain_id)

    contracts = get_project_contract(w3)
    project_contract = contracts["ProjectContract"]

    print(project_contract.all_functions())
    # TODO: obtain secret from contract

    # index = project_contract.functions.nodes(request["_address"])
    # node = project_contract.nodesArray(index - 3).dict()
    # ct = node["secret0"] + node["secret1"] + node["secret2"]
    # final_secret = decrypt_secret(ct, node["parity"], test_key.to_hex())

    # print(project_contract.functions.isNewPlan().call())
    # print(project_contract.functions.isPublic().call())
    # print(project_contract.functions.latestPlan().call())
    # res = await send_model(ENDPOINT, "README.md", 1)

    # Infinite reconnect + run infinite connection - lovely :)
    while True:
        plan = await get_plan(project_contract)
        if plan is None:
            await asyncio.sleep(3)
            continue

        # Use random seed from contract
        np.random.seed(plan[2])

        # Creat directory for storing plan
        plan_index = project_contract.functions.getPlansLength().call()
        plan_dir = LOGS / f"plan_{plan_index}"
        plan_dir.mkdir(parents=True)

        # 1. Download model by CID
        base_model_path = plan_dir / "base_model.joblib"
        await ipfs_download_file(plan, output_path=base_model_path)
        model = joblib.load(base_model_path)

        num_rounds = plan[9]
        for i in range(num_rounds):
            round_dir = plan_dir / f"round_{i}"
            round_dir.mkdir()

            # 2. Execute training
            model.fit(X, y)

            # 3. Encrypt the model
            model_path = round_dir / f"node_model.joblib"
            enc_model_path = round_dir / f"enc_node_model.joblib"
            # TODO: Optimize this part, so we don't need to r/w so many times
            joblib.dump(model, model_path)
            with open(model_path, "rb") as f:
                encrypted_model = encrypt_bytes(f.read(), SECRET)

            with open(enc_model_path, "wb") as f:
                f.write(encrypted_model)

            # 4. Upload file to IPFS
            with open(enc_model_path, "rb") as f:
                res = await ipfs_upload_file(f)
            cid = res.json()["cid"]

            # 5. Send model to the contract (current round)
            project_contract.functions.submitModel(cid).call()

            # 6. Download models and wait for round finished

            # 7. Average models
            model = average_models(models)

        # 8. Upload final model if coordinator


def main():
    asyncio.run(task())


if __name__ == "__main__":
    main()
