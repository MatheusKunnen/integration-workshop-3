
class Configuration:
    def __init__(self, config_file):
        self.config_file = config_file
    
    def get_web_socket_port(self):
        return 5443
    
    def get_nfc_reader_dev(self):
        return '/dev/ttyACM0'
    
    