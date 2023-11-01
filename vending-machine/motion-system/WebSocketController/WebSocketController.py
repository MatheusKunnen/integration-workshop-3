import asyncio
import websockets
from MotionSystemController import MotionSystemController
from NFCReader import NFCReader

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

    def __on_nfc_code_read(self, nfc_card_code):
        self.nfc_card_code = nfc_card_code

    async def handle_request_for_product(self, websocket, product_id):
        try:
            product_id = int(str(product_id).lstrip())
            message = f"Providing product {product_id}"
            await websocket.send(message)
            self.ms_controller.provide_product(product_id)
            message = f"Product provided {product_id}"
            await websocket.send(message)
        except Exception as e:
            error_message = f"Error providing product {product_id}: {str(e)}"
            await websocket.send(error_message)
            print(error_message)

    async def handle_nfc_card_reading(self, websocket):
        try:
            message = f"tagNumber {self.nfc_card_code}"
            await websocket.send(message)
            self.nfc_card_code = None
        except websockets.exceptions.ConnectionClosed:
            # Handle a closed connection, you can log or handle it as needed
            print("WebSocket connection closed.")
        except Exception as e:
            # Handle other exceptions if necessary
            print(f"Error sending message: {str(e)}")   

    async def init(self, websocket, path):
        while True:
            try:
                while not self.nfc_reader.queue.empty():
                    self.nfc_card_code = self.nfc_reader.queue.get_nowait()
                if(self.nfc_card_code):
                    await self.handle_nfc_card_reading(websocket)

                message = await asyncio.wait_for(websocket.recv(), timeout=0.5)

                if(message):
                    parts = message.split(" ")
                    if(parts[0] == "Provide"):
                        product_id = parts[1]
                        await self.handle_request_for_product(websocket, product_id)
            except asyncio.TimeoutError:
                pass
            except websockets.exceptions.ConnectionClosed:
                print("WebSocket connection closed.")
                break
            except Exception as e:
                print(f"Error: {str(e)}")

    def run(self):
       # Create the WebSocket server
        start_server = websockets.serve(self.init, self.host, self.port)
        
        # Create and run the event loop
        loop = asyncio.get_event_loop()
        loop.run_until_complete(start_server)
        
        # Run the event loop
        loop.run_forever()