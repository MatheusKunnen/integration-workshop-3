from .StepperDriver import *
from .LimiterSwitch import LimiterSwitch

class ProductDispenser:

    __SAFE_DEPTH_STEPS = 4096
    __DELTA_STEPS = 4096

    def __init__(self, pd_motor: StepperDriver, depth_motor: StepperDriver, limiter: LimiterSwitch):
        self.__pd_motor = pd_motor
        self.__depth_motor = depth_motor
        self.__limiter = limiter

    def provide_product(self, depth:int, turns:int):
        if self.__limiter.is_on():
            raise RuntimeError('PD:provide_product: Limiter already activated')
        
        self.__depth_motor.set_velocity(StepperVelocity.NORMAL)
        self.__depth_motor.step(depth)

        self.__pd_motor.step(turns)

        while not self.__limiter.is_on():
            self.__pd_motor.step(-ProductDispenser.__DELTA_STEPS)

        self.__pd_motor.step(ProductDispenser.__SAFE_DEPTH_STEPS)
