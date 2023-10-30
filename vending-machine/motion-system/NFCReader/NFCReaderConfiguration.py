from dataclasses import dataclass

@dataclass
class NFCReaderConfiguration:
    serial_port: str = '/dev/ttyACM0'
    baudrate:int = 115200