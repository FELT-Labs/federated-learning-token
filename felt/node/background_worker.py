import asyncio

import websockets

# Connect to application running on this server itself and coordinate tasks
URL = "ws://localhost:8000/training/ws"


async def producer():
    await asyncio.sleep(5)
    return "p"


async def task():
    # Infinite reconnect + run infinite connection - lovely :)
    while True:
        async with websockets.connect(URL) as websocket:
            try:
                while True:
                    cmd = await producer()
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
