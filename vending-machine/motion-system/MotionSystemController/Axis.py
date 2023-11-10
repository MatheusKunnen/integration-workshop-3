from .StepperDriver import *
from .ReflectanceSensor import ReflectanceSensor
from .LimiterSwitch import LimiterSwitch
from time import sleep
import json

class Axis:
    __DELAY_BETWEEN_CAL = 0.250
    __USE_IR_SENSOR = False

    def __init__(self, name:str, stepper:StepperDriver, limiter:LimiterSwitch, sensor:ReflectanceSensor):
        self.__name = name
        self.__stepper = stepper
        self.__limiter = limiter
        self.__sensor = sensor
        self.__reference_lines_pos = []
        self.__max_pos = -1
        self.__min_pos = -1
        self.__current_pos = -1
        self.__safe_mode = False
        self.__safe_steps = 50
        self.__delta_step = 5

    def move(self, steps, direct = False):
        if self.__safe_mode:
           self. __validate_moving_steps(steps)

        if direct or not Axis.__USE_IR_SENSOR or len(self.__reference_lines_pos) == 0:
            self.__current_pos += steps
            self.__stepper.step(steps)
        else:
            retries = 0
            while retries < 2:
                steps_groups = self.get_steps_groups(steps)
                print(steps_groups)
                for steps, activated in steps_groups:
                    print(f"{steps} {activated}")
                    self.__stepper.step(steps)
                    self.__current_pos += steps
                    print(f"ac {activated} sensor { self.__sensor.is_on()}")
                    if activated and not self.__sensor.is_on():
                        print(f"{self.__name} axis detected missing steps, recalibrating...")
                        retries += 1
                        self.__calibrate_limits()


    def move_to_position(self, position, direct=False):
        self.move(position - self.__current_pos, direct)
        if position == 0:
            self.home()

    def home(self):
        self.__safe_mode = False
        
        while not self.__limiter.is_on(): # Find min limiter
             self.move(-self.__delta_step, True)
             self.__current_pos += self.__delta_step

        while self.__limiter.is_on():
            self.move(self.__delta_step, True)
            self.__current_pos -= self.__delta_step
        
        self.move(self.__safe_steps, True)
        self.__safe_mode = True
        self.__current_pos = 0
            
        
    def initialize(self):
        print(f"Calibrating {self.__name}")
        self.__calibrate_limits()
        self.__safe_mode = True
        if Axis.__USE_IR_SENSOR:
            self.load_control_sensor_calibration()

    def __calibrate_limits(self):
        self.__safe_mode = False
        self.__max_pos = -1
        self.__min_pos = -1
        self.__current_pos = -1

        self.__stepper.set_velocity(StepperVelocity.NORMAL)
        try:
            if self.__limiter.is_on():
                raise RuntimeError(f'Calibration of {self.__name} not possible, limiter switch already activated.')

            while not self.__limiter.is_on(): # Find max limiter
                self.move(self.__delta_step, True)

            sleep(Axis.__DELAY_BETWEEN_CAL)

            self.move(-self.__safe_steps, True)

            while self.__limiter.is_on():
                self.move(-self.__delta_step, True)

            self.move(-self.__safe_steps, True)

            self.__max_pos = 0
            while not self.__limiter.is_on(): # Find min limiter
                self.move(-self.__delta_step, True)
                self.__max_pos += self.__delta_step
            
            while self.__limiter.is_on():
                self.move(self.__delta_step, True)
                self.__max_pos -= self.__delta_step
            
            self.move(self.__safe_steps, True)
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
            raise RuntimeError(f'{self.__name} axis moving to invalid position {self.__min_pos}<{n_pos}<{self.__max_pos}')
        
    def position(self):
        return self.__current_pos

    def __calibrate_control_sensor(self, save_calibration=False):
        references = []
        if self.__current_pos < 0:
            print(f"Cannot calibrate uninitialize axis")
            return

        while self.__current_pos + self.__delta_step <= self.__max_pos and not self.__limiter.is_on():
            while not self.__sensor.is_on() and self.__current_pos + self.__delta_step <= self.__max_pos:
                self.__stepper.step(self.__delta_step)
                self.__current_pos += self.__delta_step

            if self.__sensor.is_on():
                self.__stepper.step(self.__delta_step)
                self.__current_pos += self.__delta_step

                print(f"Axis {self.__name} reference found at {self.__current_pos + self.__safe_steps}")
                references.append(self.__current_pos)
                
                while self.__sensor.is_on() and self.__current_pos + self.__delta_step <= self.__max_pos:
                    self.__stepper.step(self.__delta_step)
                    self.__current_pos += self.__delta_step
                
                self.__stepper.step(self.__delta_step)
                self.__current_pos += self.__delta_step
        
        references.sort(reverse=True)
        
        for ref in references:
            print(f"ref {ref}")
            self.move_to_position(ref, True)
            if self.__sensor.is_on() and ref > 100:
                sleep(1)
                print(f"valid {ref} {self.__sensor.is_on()}")
                self.__reference_lines_pos.append(ref)

        print(self.__reference_lines_pos)
        print(f"Sensor calibration finalized, {len(self.__reference_lines_pos)} reference lines found")
        
        self.move_to_position(0)

        if save_calibration:
            self.save_control_sensor_calibration()

    def save_control_sensor_calibration(self):
        filename = f"./{self.__name.lower().replace(' ', '-')}-reference-lines.json"
        data = {'__reference_lines_pos':self.__reference_lines_pos}
        with open(filename, 'w') as file:
            json.dump(data, file, default=lambda o: o.__dict__, ensure_ascii=True, indent=4)

    def load_control_sensor_calibration(self):
        filename = f"./{self.__name.lower().replace(' ', '-')}-reference-lines.json"
        try:
            data = None
            
            with open(filename, 'r') as file:
                data = json.load(file)
            
            if data is None:
                raise Exception('Invalid file')
            
            if '__reference_lines_pos' in data:
                self.__reference_lines_pos = data['__reference_lines_pos']
            else:
                print(f'Invalid references lines file for {self.__name}')
                self.__reference_lines_pos = []
                self.__calibrate_control_sensor()
        except:
            self.__reference_lines_pos = []
            self.__calibrate_control_sensor(True)

    def get_steps_groups(self, steps:int):
        references_available = []
        for ref in self.__reference_lines_pos:
            if steps > 0:
                print(f"{self.__current_pos}<{ref}<{self.__current_pos + steps} {self.__current_pos < ref < self.__current_pos + steps}")
                if self.__current_pos < ref < self.__current_pos + steps:
                    references_available.append(ref)
            elif steps < 0:
                print(f"{self.__current_pos + steps}<{ref}<{self.__current_pos} {self.__current_pos + steps < ref < self.__current_pos}")
                if  self.__current_pos + steps < ref < self.__current_pos:
                    references_available.append(ref)
        
        if len(references_available) == 0:
            return [(steps, False)]
        
        references = []
        references_available.sort(reverse=steps > 0)
        pos = self.__current_pos
        while pos != self.__current_pos + steps and len(references_available) > 0:
            target_pos = references_available.pop()
            steps_to_target = target_pos - pos
            pos += steps_to_target
            references.append((steps_to_target, True))

        if pos != self.__current_pos + steps:
            steps_to_final = self.__current_pos + steps - pos 
            references.append((steps_to_final, False))

        return references

