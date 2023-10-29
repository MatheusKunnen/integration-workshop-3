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

# class StepperDriver(ABC):

#     def __init__(self,):
#         self._position = 0
#         self._velocity:StepperVelocity = StepperVelocity.NORMAL
#         self._safe_mode = False
#         self._max_pos = -1
#         self._min_pos = 0

#     @abstractmethod
#     def move(self, steps:int, velocity=None):
#         pass

#     @abstractmethod
#     def move_to_position(self, position:int, velocity=None):
#         pass

#     @abstractmethod
#     def set_direction(self, dir: StepperDirection):
#         pass

#     @abstractmethod
#     def calibrate(self):
#         pass
    
#     def set_current_position(self, position: int):
#         self._position = position