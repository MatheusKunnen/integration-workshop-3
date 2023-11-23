from .StepperDriver import *
from .LimiterSwitch import LimiterSwitch

class ProductDispenser:

    __SAFE_DEPTH_STEPS = round(4096/2)
    __DELTA_STEPS = round(4096/8)
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
        
        self.__depth_motor.set_velocity(StepperVelocity.FAST)
        self.__depth_motor.step(depth)

        self.__pd_motor.set_velocity(StepperVelocity.FAST)
        dir = 1
        left_depth = depth
        while left_depth > 0:
            self.__pd_motor.step(dir*ProductDispenser.__WIGGLE_STEPS, queue=True)
            dir *= -1
            left_depth -= ProductDispenser.__DELTA_STEPS
            self.__depth_motor.step(ProductDispenser.__DELTA_STEPS, queue=True)
            
            self.__pd_motor.step(-dir*ProductDispenser.__WIGGLE_STEPS, queue=True)
            
        self.__depth_motor.step(-1*ProductDispenser.__STEPS_PER_REV, queue=True)

        self.__depth_motor.join()
        self.__pd_motor.join()

        self.__pd_motor.set_velocity(StepperVelocity.SLOW)        
        self.__pd_motor.step(turns)

    
    def home(self, depth:int):
        self.__pd_motor.step(-round(ProductDispenser.__WIGGLE_STEPS/2), StepperVelocity.FAST, queue=True)
        self.__pd_motor.step(round(ProductDispenser.__WIGGLE_STEPS/2), StepperVelocity.FAST, queue=True)
        self.__depth_motor.step(-round(ProductDispenser.__STEPS_PER_REV), StepperVelocity.NORMAL)

        self.__depth_motor.join()
        self.__pd_motor.join()

        t_steps = ProductDispenser.__STEPS_PER_REV
        self.__depth_motor.set_velocity(StepperVelocity.FAST)
        while not self.__limiter.is_on() and t_steps < depth*2:
            self.__depth_motor.step(-ProductDispenser.__DELTA_STEPS)
            t_steps += ProductDispenser.__DELTA_STEPS
        
        if not self.__limiter.is_on():
            self.__depth_motor.set_velocity(StepperVelocity.NORMAL)
            while not self.__limiter.is_on():
                self.__depth_motor.step(-ProductDispenser.__DELTA_STEPS)
                t_steps += ProductDispenser.__DELTA_STEPS
                
        self.__depth_motor.set_velocity(StepperVelocity.SLOW)
        while self.__limiter.is_on():
            self.__depth_motor.step(ProductDispenser.__DELTA_STEPS)
        
        self.__depth_motor.set_velocity(StepperVelocity.NORMAL)
        self.__depth_motor.step(ProductDispenser.__SAFE_DEPTH_STEPS)
