import asyncio

import websockets

from felt.core.web3 import get_project_contract, get_web3

# Connect to application running on this server itself and coordinate tasks
URL = "ws://localhost:8000/training/ws"


async def get_plan(project_contract):
    await asyncio.sleep(3)
    if project_contract.functions.isNewPlan().call():
        plan = project_contract.functions.latestPlan().call()
        return plan
    return None


async def task():
    w3 = get_web3()
    print("Worker connected to chain id: ", w3.eth.chain_id)

    contracts = get_project_contract(w3)
    print(contracts)
    project_contract = contracts["ProjectContract"]
    print(project_contract.functions.isNewPlan().call())
    print(project_contract.functions.isPublic().call())
    print(project_contract.functions.latestPlan().call())

    # Infinite reconnect + run infinite connection - lovely :)
    while True:
        plan = await get_plan(project_contract)
        if plan is None:
            continue

        async with websockets.connect(URL) as websocket:
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
