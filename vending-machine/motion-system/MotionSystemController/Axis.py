from .StepperDriver import *
from .ReflectanceSensor import ReflectanceSensor
from .LimiterSwitch import LimiterSwitch

class Axis:

    def __init__(self, name:str, stepper:StepperDriver, limiter:LimiterSwitch, sensor:ReflectanceSensor):
        self.__name = name
        self.__stepper = stepper
        self.__limiter = limiter
        self.__sensor = sensor
        self.__max_pos = -1
        self.__min_pos = -1
        self.__current_pos = -1
        self.__safe_mode = False
        self.__safe_steps = 50
        self.__delta_step = 5

    def move(self, steps):
        if self.__safe_mode:
           self. __validate_moving_steps(steps)
        self.__current_pos += steps
        self.__stepper.step(steps)
        
    def initialize(self):
        self.__calibrate_limits()
        self.__safe_mode = True

    def __calibrate_limits(self):
        self.__safe_mode = False
        self.__stepper.set_velocity(StepperVelocity.SLOW)
        try:
            if self.__limiter.is_on():
                raise RuntimeError(f'Calibration of {self.__name} not possible, limiter switch already activated.')
            
            while not self.__limiter.is_on(): # Find max limiter
                self.move(self.__delta_step)

            while self.__limiter.is_on():
                self.move(-self.__delta_step)

            self.move(self.__safe_steps)

            self.__max_pos = 0
            while not self.__limiter.is_on(): # Find min limiter
                self.move(-self.__delta_step)
                self.__max_pos += self.__delta_step
            
            while self.__limiter.is_on():
                self.move(self.__delta_step)    
                self.__max_pos -= self.__delta_step
            
            self.move(self.__safe_steps)
            self.__max_pos -= self.__safe_mode

            self.__min_pos = 0
        finally:
            self.__stepper.set_velocity(StepperVelocity.NORMAL)

    def __validate_moving_steps(self, steps):
        n_pos = self.__current_pos + steps
        is_valid = self.__min_pos <= n_pos <= self.__max_pos
        if not is_valid:
            raise RuntimeError(f'{self.__name} axis moving to invalid position {n_pos}')

    def __calibrate_control_sensor():
        pass