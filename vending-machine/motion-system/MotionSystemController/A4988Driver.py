from time import sleep
from .StepperDriver import *

try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO

class A4988Driver(StepperDriver):
    __STEPS_PER_REVOLUTION = 200

    def __init__(self, step_pin, dir_pin):
        StepperDriver.__init__(self)
        self.__step_pin = step_pin
        self.__dir_pin = dir_pin
        self.start_process()

    def step(self, steps:int, velocity=None, queue=False):
        if steps == 0:
            return
        
        if queue:
            self.add_step_to_queue(steps, velocity)
            return 
        
        dir = StepperDirection.CW if steps > 0 else StepperDirection.CCW
        self.__set_direction(dir)

        if velocity is None:
            velocity = self._velocity

        delay = self.__get_delay(velocity)

        steps = abs(steps)
        for _ in range(steps):
            GPIO.output(self.__step_pin, GPIO.HIGH)
            sleep(delay)
            GPIO.output(self.__step_pin, GPIO.LOW)
            sleep(delay)

    def __set_direction(self, dir: StepperDirection):
        GPIO.output(self.__dir_pin, True if dir ==StepperDirection.CW else False)

    def __get_delay(self, velocity: StepperVelocity):
        if velocity == StepperVelocity.NORMAL:
            return 0.000500 #0.0005 # 500us
        elif velocity == StepperVelocity.FAST:
            return 0.000400 #0.0004 # 400us
        else:
            return 0.000700 #0.0007 # 700us
