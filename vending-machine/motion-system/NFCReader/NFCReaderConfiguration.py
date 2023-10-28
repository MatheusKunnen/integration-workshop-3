from dataclasses import dataclass

@dataclass
class NFCReaderConfiguration:
    serial_port: str | None = '/dev/ttyACM0'
    baudrate:int = 115200