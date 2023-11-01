from Configuration import Configuration
from MotionSystemController import MotionSystemController
from MotionSystemController import MotionSystemConfiguration
from NFCReader import NFCReader
from WebSocketController import WebSocketController

class Main:

    def __init__(self, config_file='./config.json'):
        self.config = Configuration(config_file)

        self.motion_system_config = MotionSystemConfiguration()
        self.motion_system_c = MotionSystemController(self.motion_system_config)
        self.nfc_reader = NFCReader(self.config.get_nfc_reader_config())
        
        self.web_socket_c = WebSocketController(self.motion_system_c, self.nfc_reader, self.config.get_web_socket_port())

    def run(self):
        self.nfc_reader.start()
        self.web_socket_c.run()

if __name__ == "__main__":
    main = Main()
    main.run()