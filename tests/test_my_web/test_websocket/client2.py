from websockets.sync.client import connect
import threading

def receive_messages(websocket):
    while True:
        try:
            message = websocket.recv()
            if not message:
                break
            print(f"Received: {message}")
        except:
            websocket.close()
            break

def start_client():
    with connect("ws://localhost:8765") as websocket:
        receive_thread = threading.Thread(target=receive_messages, args=(websocket,))
        receive_thread.start()

        while True:
            message_to_send = input("Enter your message: ")
            websocket.send(message_to_send)

if __name__ == "__main__":
    start_client()
