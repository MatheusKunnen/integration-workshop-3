from .StepperDriver import *
from time import sleep

try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO

class ULN2009Driver(StepperDriver):
    __STEP_SEQ = [(1,0,0,1),
                    (1,0,0,0),
                    (1,1,0,0),
                    (0,1,0,0),
                    (0,1,1,0),
                    (0,0,1,0),
                    (0,0,1,1),
                    (0,0,0,1)]
    
    def __init__(self, pins):
        self.__pins = tuple(pins)
        self.__current_step = 0

    def step(self, steps:int, velocity=None):
        dir = StepperDirection.CW if steps > 0 else StepperDirection.CCW

        if velocity is None:
            velocity = self._velocity

        delay = self.__get_delay(velocity)

        steps = abs(steps)
        for _ in range(steps):
            GPIO.output(self.__pins, ULN2009Driver[self.__current_step])
            sleep(delay)
            self.__next_step(dir)

    def __get_delay(self, velocity: StepperVelocity):
        if velocity == StepperVelocity.NORMAL:
            return 0.0008 # 800us
        elif velocity == StepperVelocity.FAST:
            return 0.0004 # 400us
        else:
            return 0.001 # 1000us
        
    def __next_step(self, direction: StepperDirection):
        if direction==StepperDirection.CW:
            self.__current_step = (self.__current_step - 1) % len(ULN2009Driver.__STEP_SEQ)
        else:
            self.__current_step = (self.__current_step + 1) % len(ULN2009Driver.__STEP_SEQ)