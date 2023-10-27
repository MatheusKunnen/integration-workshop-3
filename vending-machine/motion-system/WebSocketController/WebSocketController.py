from MotionSystemController import MotionSystemController
from NFCReader import NFCReader
import time
import socket
import threading
class WebSocketController:
    def __init__(self, ms_controller: MotionSystemController, nfc_reader: NFCReader, port=5443, host='127.0.0.1'):
        self.ms_controller = ms_controller
        self.nfc_reader = nfc_reader
        self.port = port
        self.host = host
        self.nfc_card_code = None
        self.__setup()

    def __setup(self):
        self.nfc_reader.set_callback(self.__on_nfc_code_read)

    # This function will be called when a nfc card is read
    def __on_nfc_code_read(self, nfc_card_code):
        self.nfc_card_code = nfc_card_code
        print(f'NFC: {nfc_card_code}')

    def handle_request_for_product(self, client_socket):
        while True:
            # TODO: Define structure of exchanged messages
            data = client_socket.recv(1024)
            if(data):
                product_id = data.decode()
                print(f"Message received: {product_id}\n")
                try:
                    message = f"Providing product {product_id}"
                    client_socket.send(message.encode())
                    self.ms_controller.provide_product(product_id)
                    message = f"Product provided {product_id}"
                    client_socket.send(message.encode())
                except Exception as e:
                    error_message = f"Error providing product {product_id}: {str(e)}"
                    client_socket.send(error_message.encode())
                    print(error_message)

    def handle_nfc_card_reading(self, client_socket):
        while True:
            # TODO: Define structure of exchanged messages
            if self.nfc_card_code:
                alert_message = f"NFC tag {self.nfc_card_code}\n"
                client_socket.send(alert_message.encode())
                self.nfc_card_code = None
            time.sleep(0.2) # Arbitrary value

    def run(self):
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind((self.host, self.port))
        server_socket.listen(1)

        print(f"Server waiting for connections in {self.host}:{self.port}")

        while True:
            client_socket, addr = server_socket.accept()
            print(f"Connection established with {addr}")

            handle_request_for_product = threading.Thread(target=self.handle_request_for_product, args=(client_socket,))
            handle_request_for_product.start()
            handle_nfc_card_reading = threading.Thread(target=self.handle_nfc_card_reading, args=(client_socket,))
            handle_nfc_card_reading.start()