from .StepperDriver import *
from .LimiterSwitch import LimiterSwitch

class ProductDispenser:

    __SAFE_DEPTH_STEPS = round(4096/2)
    __DELTA_STEPS = round(4096/4)
    __STEPS_PER_REV = 4096
    __WIGGLE_STEPS = round(180/2)

    def __init__(self, pd_motor: StepperDriver, depth_motor: StepperDriver, limiter: LimiterSwitch):
        self.__pd_motor = pd_motor
        self.__depth_motor = depth_motor
        self.__limiter = limiter

    def initialize(self):
        if self.__limiter.is_on():
            raise RuntimeError('PD:provide_product: Limiter already activated')
        
        while not self.__limiter.is_on():
            self.__depth_motor.step(-ProductDispenser.__DELTA_STEPS)

        while self.__limiter.is_on():
            self.__depth_motor.step(ProductDispenser.__DELTA_STEPS)

        self.__depth_motor.step(ProductDispenser.__SAFE_DEPTH_STEPS)

    def provide_product(self, depth:int, turns:int):
        if self.__limiter.is_on():
            raise RuntimeError('PD:provide_product: Limiter already activated')
        
        initial_depth = ProductDispenser.__STEPS_PER_REV #round(depth*0.25)
        left_depth = depth - initial_depth
        self.__depth_motor.set_velocity(StepperVelocity.NORMAL)
        self.__depth_motor.step(depth)

        self.__pd_motor.set_velocity(StepperVelocity.FAST)
        dir = 1
        while left_depth > 0:
            self.__pd_motor.step(dir*ProductDispenser.__WIGGLE_STEPS)
            # dir *= -1
            left_depth -= ProductDispenser.__DELTA_STEPS
            self.__depth_motor.step(ProductDispenser.__DELTA_STEPS)

            self.__pd_motor.step(-ProductDispenser.__WIGGLE_STEPS)
        self.__depth_motor.step(-2*ProductDispenser.__STEPS_PER_REV)

        self.__pd_motor.set_velocity(StepperVelocity.SLOW)        
        self.__pd_motor.step(turns)

        t_steps = ProductDispenser.__STEPS_PER_REV
        self.__depth_motor.set_velocity(StepperVelocity.FAST)
        while not self.__limiter.is_on() and t_steps < depth*3:
            self.__depth_motor.step(-ProductDispenser.__DELTA_STEPS)
            t_steps += ProductDispenser.__DELTA_STEPS

        self.__depth_motor.set_velocity(StepperVelocity.FAST)
        while self.__limiter.is_on():
            self.__depth_motor.step(ProductDispenser.__DELTA_STEPS)

        self.__depth_motor.step(ProductDispenser.__SAFE_DEPTH_STEPS)
