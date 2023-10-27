from Configuration import Configuration
from MotionSystemController import MotionSystemController
from WebSocketController import WebSocketController
from NFCReader import NFCReader

class Main:

    def __init__(self, config_file='./config.json'):
        self.config = Configuration(config_file)
        self.motion_system_c = MotionSystemController()
        self.nfc_reader = NFCReader(self.config.get_nfc_reader_dev())
        self.web_socket_c = WebSocketController(self.motion_system_c, self.nfc_reader, self.config.get_web_socket_port())

    def run(self):
        self.web_socket_c.run()

if __name__ == "__main__":
    main = Main()
    main.run()