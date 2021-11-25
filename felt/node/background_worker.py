import asyncio
from pathlib import Path

import httpx
import joblib
import websockets
from dotenv import load_dotenv

from felt.core.storage import download_file, upload_file
from felt.core.web3 import decrypt_secret, get_project_contract, get_web3

# Load dotenv at the beginning of the program
load_dotenv()

# Connect to application running on this server itself and coordinate tasks
ENDPOINT = "localhost:8000"
PROTOCOL = "http://"
WS = "ws://"

LOGS = Path(__file__).parent / "logs"


async def get_plan(project_contract):
    if project_contract.functions.isNewPlan().call():
        plan = project_contract.functions.latestPlan().call()
        return plan
    return None


async def send_model(endpoint, model_file, round):
    async with httpx.AsyncClient() as client:
        with open(model_file, "rb") as f:
            res = await client.post(
                f"{PROTOCOL}{endpoint}/training/upload_model",
                data={
                    "client_id": 1,
                    "hash": "123",
                    "round": round,
                },
                files={"model_file": ("model.joblib", f)},
            )

    return res.is_success and res.text == "Received."


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

        # Creat directory for storing plan
        plan_index = project_contract.functions.getPlansLength().call()
        plan_dir = LOGS / f"plan_{plan_index}"
        plan_dir.mkdir(parents=True)

        # 1. Download model by CID
        base_model_path = plan_dir / "base_model.joblib"
        await download_file(plan, output_path=base_model_path)
        model = joblib.load(base_model_path)

        num_rounds = plan[9]
        for i in range(num_rounds):
            round_dir = plan_dir / f"round_{i}"
            round_dir.mkdir()

            # 2. Execute training
            model.fit(X, y)

            # 3. Upload model to round
            model_path = round_dir / f"node_model.joblib"
            joblib.dump(model, model_path)
            with open(model_path, "rb") as f:
                # TODO: encrypt model first
                res = await upload_file(f)
            cid = res.json()["cid"]

            # TODO: upload model CID to contract

            # 4. Start donwloading models from other nodes for this round

            # 5. Average models

        async with websockets.connect(f"{WS}{ENDPOINT}/training/ws") as websocket:
            try:
                while True:
                    # Request plan pull
                    await websocket.send(cmd)
                    rec = await websocket.recv()
                    print("Received")

            except websockets.ConnectionClosed:
                continue


def main():
    asyncio.run(task())


if __name__ == "__main__":
    main()
