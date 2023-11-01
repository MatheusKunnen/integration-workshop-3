from .StepperDriver import *
from .ReflectanceSensor import ReflectanceSensor
from .LimiterSwitch import LimiterSwitch
from time import sleep

class Axis:
    __DELAY_BETWEEN_CAL = 0.250

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

    def move_to_position(self, position):
        self.move(position - self.__current_pos)
        
    def initialize(self):
        print(f"Calibrating {self.__name}")
        self.__calibrate_limits()
        self.__safe_mode = True

    def __calibrate_limits(self):
        self.__safe_mode = False
        self.__stepper.set_velocity(StepperVelocity.NORMAL)
        try:
            if self.__limiter.is_on():
                raise RuntimeError(f'Calibration of {self.__name} not possible, limiter switch already activated.')

            while not self.__limiter.is_on(): # Find max limiter
                self.move(self.__delta_step)

            sleep(Axis.__DELAY_BETWEEN_CAL)

            self.move(-self.__safe_steps)

            while self.__limiter.is_on():
                self.move(-self.__delta_step)

            self.move(-self.__safe_steps)

            self.__max_pos = 0
            while not self.__limiter.is_on(): # Find min limiter
                self.move(-self.__delta_step)
                self.__max_pos += self.__delta_step
            
            while self.__limiter.is_on():
                self.move(self.__delta_step)    
                self.__max_pos -= self.__delta_step
            
            self.move(self.__safe_steps)
            self.__max_pos -= self.__safe_steps

            if self.__limiter.is_on():
                raise RuntimeError(f'Calibration of {self.__name} not possible, jammed axis.')

            self.__min_pos = 0
            self.__current_pos = 0

            print(f"{self.__name} axis calibrated min:{self.__min_pos} max:{self.__max_pos}")
        finally:
            self.__stepper.set_velocity(StepperVelocity.NORMAL)

    def __validate_moving_steps(self, steps):
        n_pos = self.__current_pos + steps
        is_valid = self.__min_pos <= n_pos <= self.__max_pos
        if not is_valid:
            raise RuntimeError(f'{self.__name} axis moving to invalid position {n_pos}')
        
    def position(self):
        return self.__current_pos

    def __calibrate_control_sensor():
        pass