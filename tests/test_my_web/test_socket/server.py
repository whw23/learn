import socket
import threading

def handle_client(client_socket, addr):
    print(f"New connection from {addr}")
    while True:
        try:
            data = client_socket.recv(1024)
            if not data:
                break
            print(f"Received from {addr}: {data.decode('utf-8')}")
            for client in clients:
                if client != client_socket:
                    client.send(f"Message from {addr}: {data.decode('utf-8')}".encode('utf-8'))
        except:
            clients.remove(client_socket)
            client_socket.close()
            break

def start_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('127.0.0.1', 12345))
    server_socket.listen(5)
    print("Server started, waiting for connections...")

    while True:
        client_socket, addr = server_socket.accept()
        clients.append(client_socket)
        client_handler = threading.Thread(target=handle_client, args=(client_socket, addr))
        client_handler.start()

clients = []

if __name__ == "__main__":
    start_server()
