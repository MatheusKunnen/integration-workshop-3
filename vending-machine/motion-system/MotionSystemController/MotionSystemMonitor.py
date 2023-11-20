from .LimiterSwitch import LimiterSwitch

from multiprocessing import Process, Queue

try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO

class MotionSystemMonitor:

    def __init__(self, limiter: LimiterSwitch, enable_pin: int):
        self.__limiter = limiter
        self.__enable_pin = enable_pin
        self.__queue = Queue()
        self.__counter = 0
        self.__process = Process(name="motion-system-monitor", target=self.__process_entry, daemon=True)
        
    def enable_safe_mode(self):
        self.__queue.put(True)

    def disable_safe_mode(self):
        self.__queue.put(False)

    def start(self):
        self.__process.start()

    def __limiter_callback(self, channel):
        status = GPIO.input(self.__limiter.pin())
        if status and self.__counter > 0:
            print("WARNING: Disabling motors")
            GPIO.output(self.__enable_pin, True)

    def __process_entry(self):
        print('Motion System Monitor process started')
        
        GPIO.add_event_detect(self.__limiter.pin(), GPIO.BOTH, callback=self.__limiter_callback, bouncetime=50)

        while True:
            try:
                safe_mode = self.__queue.get(block=True)
                print(f'Monitor', safe_mode)
                if safe_mode:
                    self.__counter += 1
                elif self.__counter > 0:
                    self.__counter -= 1
            except Exception as e:
                if len(e.__str__()) > 0:
                    print(e)