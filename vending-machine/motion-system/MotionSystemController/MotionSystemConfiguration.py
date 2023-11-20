from dataclasses import dataclass

@dataclass
class MotionSystemConfiguration:

    en_pin:int = 17
    dir_pin:int = 27

    step_pin_h:int = 22
    step_pin_v:int = 4

    pd_motor_pins:(int) = (26, 19, 13, 6)
    depth_motor_pins:(int) = (12, 16, 20, 21)

    limiter_pin:int = 24
    sensor_pin_h:int = 3
    sensor_pin_v:int = 2

    def input_pins(self):
        return [self.limiter_pin, self.sensor_pin_h, self.sensor_pin_v]
    
    def output_pins(self):
        pins = [self.en_pin, self.dir_pin, self.step_pin_h, self.step_pin_v]
        
        for pin in self.pd_motor_pins:
            pins.append(pin)
        for pin in self.depth_motor_pins:
            pins.append(pin)

        return pins
    
    def default_high_pins(self):
        return [self.en_pin]
    
    def default_low_pins(self):
        pins = [self.dir_pin, self.step_pin_h, self.step_pin_v]

        for pin in self.pd_motor_pins:
            pins.append(pin)
        for pin in self.depth_motor_pins:
            pins.append(pin)

        return pins


