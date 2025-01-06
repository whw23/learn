import asyncio
import websockets

connected_clients = set()

async def handle_client(websocket):
    print(f"New connection from {websocket.remote_address}")
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            print(f"New message from {websocket.remote_address}: {message}")
            for client in connected_clients:
                if client != websocket:
                    await client.send(f"Message from {websocket.remote_address}: {message}")
                else:
                    await client.send(f"Message successfully sent to server: {message}")
    except websockets.ConnectionClosed:
        print(f"Connection closed from {websocket.remote_address}")
    finally:
        connected_clients.remove(websocket)

async def main():
    async with websockets.serve(handle_client, "localhost", 8765):
        print("Server started on ws://localhost:8765")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
