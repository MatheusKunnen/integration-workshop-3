from abc import ABC, abstractmethod
from enum import Enum
from multiprocessing import Process, JoinableQueue

class StepperDirection(Enum):
    CW = 1
    CCW = 2

class StepperVelocity(Enum):
    NORMAL = 0
    FAST = 1
    SLOW = 2

class StepperDriver(ABC):

    __QUEUE_ENABLE = True

    def __init__(self, name:str = 'N/A' ):
        self.name = name
        self._velocity:StepperVelocity = StepperVelocity.NORMAL
        self._queue_wait_time = 0.001
        self.__queue = JoinableQueue()
        self.__thread_started = False
        if StepperDriver.__QUEUE_ENABLE:
            self.__queue_process = Process(name=f"Stepper {name}", target=self.__run, daemon=True)


    @abstractmethod
    def step(self, steps:int, velocity=None, queue=False):
        pass
    
    def join(self):
        if self.__thread_started:
            self.__queue.join()

    def add_step_to_queue(self, steps: int, velocity=None):
        if self.__thread_started:
            self.__queue.put((steps, velocity))
        else:
            print(f'[{self.name}] WARN: Tried to add steps to unstarted driver queue')

    def start_process(self):
        self.__thread_started = True
        self.__queue_process.start()

    def __run(self):
        print(f'Motor {self.name} process started')
        while True:
            try:
                steps, vel = self.__queue.get(block=True)
                self.step(steps, vel, False)
            except Exception as e:
                print(e)
            finally:
                self.__queue.task_done()

    def set_velocity(self, velocity: StepperVelocity):
        self._velocity = velocity
