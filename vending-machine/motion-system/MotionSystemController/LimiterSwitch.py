try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO

class LimiterSwitch:
    DEBUG = False

    def __init__(self, pin:int):
        self.__pin = pin
        self.__observers = []
        self.__status: bool = False
        self.__observer_ready = False

    def __setup_observer(self):
        # GPIO.add_event_detect(self.__pin, GPIO.BOTH, 
            # callback=self.__on_change_cb, bouncetime=50)
        self.__observer_ready = True

    def __on_change_cb(self, channel):
        if self.DEBUG:
            print(f'Switch changed')

        new_status = True if GPIO.input(self.__pin) else False

        if self.__status != new_status:
            self.__status = new_status
            self.__notify_observers

    def __notify_observers(self):
        for observer in self.__observers:
            observer(self.__status)

    def is_on(self):
        return GPIO.input(self.__pin) #self.__status
    
    def pin(self):
        return self.__pin
    
    def add_observer(self, observer):
        self.__observers.append(observer) 
        if not self.__observer_ready:
            self.__setup_observer()

