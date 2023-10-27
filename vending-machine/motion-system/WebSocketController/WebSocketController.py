from MotionSystemController import MotionSystemController
from NFCReader import NFCReader

class WebSocketController:
    def __init__(self, ms_controller: MotionSystemController, nfc_reader: NFCReader, port=5443):
        self.ms_controller = ms_controller
        self.nfc_reader = nfc_reader
        self.port = port
        self.__setup()

    def __setup(self):
        self.nfc_reader.set_callback(self.__on_nfc_code_read)

    # This function will be called when a nfc card is read
    def __on_nfc_code_read(self, nfc_card_code):
        print(f'NFC: {nfc_card_code}')

    def run(self):
        # websocket server...
        ### To request product call the following function ###
        # If ok returns nothing
        # If an error exist will throw a exception with the error message
        # self.ms_controller.provide_product(product_id)
        pass
