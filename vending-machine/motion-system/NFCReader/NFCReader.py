from serial import Serial
from threading import Thread

from .NFCReaderConfiguration import *

class NFCReader:
    __DEBUG = False

    def __init__(self, config: NFCReaderConfiguration):
        self.__config = config
        self.__serial = None
        self.__callback = None
        self.__thread = None
        self.__setup()

    def __setup(self):
        if self.__config.serial_port is not None:
            self.__serial = Serial(self.__config.serial_port, self.__config.baudrate)

    def set_callback(self, callback):
        self.__callback = callback

    def start(self):
        if self.__thread is not None:
            raise RuntimeError('NFCReader thread already started')
        
        self.__thread = Thread(target=self.__run, name='NFC Reader Thread', daemon=True)
        
        if self.__serial is not None:
            self.__thread.start()

    def __run(self):
        print('NFC Reader thread started')
        try:
            while True:
                raw_data = self.__serial.readline()
                nfc_code = raw_data.decode().replace('\r','').replace('\n','').lstrip()

                if NFCReader.__DEBUG:
                    print(f'NFC: {nfc_code}')
                
                self.__callback(nfc_code)
        except Exception as e:
            print(e)