from abc import ABC, abstractmethod
from enum import Enum

class StepperDirection(Enum):
    CW = 1
    CCW = 2

class StepperVelocity(Enum):
    NORMAL = 0
    FAST = 1
    SLOW = 2

class StepperDriver(ABC):

    def __init__(self,  ):
        self._velocity:StepperVelocity = StepperVelocity.NORMAL

    @abstractmethod
    def step(self, steps:int, velocity=None):
        pass

    def set_velocity(self, velocity: StepperVelocity):
        self._velocity = velocity
