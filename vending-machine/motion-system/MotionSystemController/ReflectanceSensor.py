try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO

class ReflectanceSensor:
    DEBUG = False

    def __init__(self, pin:int, name:str='None'):
        self.__pin = pin
        self.__name = name
        self.__observers = []
        self.__status: bool = False
        self.__setup()

    def __setup(self):
        GPIO.add_event_detect(self.__pin, GPIO.BOTH, 
            callback=self.__on_change_cb, bouncetime=50)

    def __on_change_cb(self):
        if self.DEBUG:
            print(f'IR Sensor {self.__name} changed')

        new_status = True if GPIO.input(self.__pin) else False

        if self.__status != new_status:
            self.__status = new_status
            self.__notify_observers

    def __notify_observers(self):
        for observer in self.__observers:
            observer(self.__status)

    def is_on(self):
        return self.__status
    
    def add_observer(self, observer):
        self.__observers.append(observer) 
