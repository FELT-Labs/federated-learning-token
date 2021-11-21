import asyncio
from pathlib import Path

import httpx
import websockets

from felt.core.web3 import get_project_contract, get_web3

# Connect to application running on this server itself and coordinate tasks
ENDPOINT = "localhost:8000"
PROTOCOL = "http://"
WS = "ws://"

LOGS = Path(__file__).parent / "logs"


async def get_plan(project_contract):
    await asyncio.sleep(3)
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
    # w3 = get_web3()
    # print("Worker connected to chain id: ", w3.eth.chain_id)

    # contracts = get_project_contract(w3)
    # print(contracts)
    # project_contract = contracts["ProjectContract"]
    # print(project_contract.functions.isNewPlan().call())
    # print(project_contract.functions.isPublic().call())
    # print(project_contract.functions.latestPlan().call())
    res = await send_model(ENDPOINT, "README.md", 1)
    print("Upload result", res)

    # Infinite reconnect + run infinite connection - lovely :)
    while True:
        plan = await get_plan(project_contract)
        if plan is None:
            continue

        async with websockets.connect(f"{WS}{ENDPOINT}/training/ws") as websocket:
            try:
                while True:
                    # Request plan pull
                    await websocket.send(cmd)
                    rec = await websocket.recv()
                    print("Received")

            except websockets.ConnectionClosed:
                continue

    await client.aclose()


def main():
    asyncio.run(task())


if __name__ == "__main__":
    main()
