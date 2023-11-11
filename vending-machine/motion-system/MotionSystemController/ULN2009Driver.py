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
        StepperDriver.__init__(self)
        self.__pins = tuple(pins)
        self.__current_step = 0
        GPIO.output(self.__pins, (0,0,0,0))

    def step(self, steps:int, velocity=None):
        dir = StepperDirection.CW if steps > 0 else StepperDirection.CCW

        if velocity is None:
            velocity = self._velocity

        delay = self.__get_delay(velocity)

        steps = abs(steps)
        for _ in range(steps):
            GPIO.output(self.__pins, ULN2009Driver.__STEP_SEQ[self.__current_step])
            sleep(delay)
            self.__next_step(dir)

        self.__current_step = 0
        GPIO.output(self.__pins, (0,0,0,0))

    def __get_delay(self, velocity: StepperVelocity):
        if velocity == StepperVelocity.NORMAL:
            return 0.00120 # 1000us
        elif velocity == StepperVelocity.FAST:
            return 0.00100 #  750us
        else:
            return 0.000900 #0.00150 # 1500us
        
    def __next_step(self, direction: StepperDirection):
        if direction==StepperDirection.CW:
            self.__current_step = (self.__current_step - 1) % len(ULN2009Driver.__STEP_SEQ)
        else:
            self.__current_step = (self.__current_step + 1) % len(ULN2009Driver.__STEP_SEQ)
