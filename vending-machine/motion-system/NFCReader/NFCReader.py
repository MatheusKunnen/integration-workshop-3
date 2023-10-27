import time
import threading
class NFCReader:
    def __init__(self, serial_port='/dev/ttyACM0'):
        self.serial_port = serial_port
        self.callback = None
        # Only for testing purposes
        # TODO: Remove threads and method run
        run = threading.Thread(target=self.run)
        run.start()

    def set_callback(self, callback):
        self.callback = callback

    def run(self):
        tag = 1
        while(1):
            if(self.callback):
                time.sleep(10)
                self.callback(f'{tag}')
                tag += 1
