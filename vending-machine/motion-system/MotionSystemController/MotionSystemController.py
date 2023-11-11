from .MotionSystemConfiguration import MotionSystemConfiguration
from .Axis import Axis
from .A4988Driver import A4988Driver
from .ULN2009Driver import ULN2009Driver
from .StepperDriver import *
from .LimiterSwitch import LimiterSwitch
from .ReflectanceSensor import ReflectanceSensor
from .ProductDispenser import ProductDispenser

import json

try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO
    
class MotionSystemController:

    __DEFAULT_PRODUCTS = [
        {"id": 1, "v_pos": 450, "h_pos": 450, "depth":4096*7, "turns":4096+2048},
        {"id": 2, "v_pos": 450, "h_pos": 2825, "depth":4096*7, "turns":4096+2048},
        {"id": 3, "v_pos": 450, "h_pos": 5225, "depth":4096*7, "turns":4096+2048},
        {"id": 4, "v_pos": 4850, "h_pos": 450, "depth":4096*7, "turns":4096+2048},
        {"id": 5, "v_pos": 4850, "h_pos": 2825, "depth":4096*7, "turns":4096+2048},
        {"id": 6, "v_pos": 4850, "h_pos": 5225, "depth":4096*5, "turns":4096+2048},
    ]

    def __init__(self, config: MotionSystemConfiguration):
        self.__products = MotionSystemController.__DEFAULT_PRODUCTS
        self.__config = config

        self.__initialize_gpio()

        self.__h_motor: StepperDriver = A4988Driver(config.step_pin_h, config.dir_pin)
        self.__v_motor: StepperDriver = A4988Driver(config.step_pin_v, config.dir_pin)

        self.__pd_motor: StepperDriver = ULN2009Driver(config.pd_motor_pins)
        self.__depth_motor: StepperDriver = ULN2009Driver(config.depth_motor_pins)

        self.__limiter_sw: LimiterSwitch = LimiterSwitch(config.limiter_pin)
        self.__h_sensor: ReflectanceSensor = ReflectanceSensor(config.sensor_pin_h, 'Horizontal')
        self.__v_sensor: ReflectanceSensor = ReflectanceSensor(config.sensor_pin_v, 'Vertical')

        self.__h_axis: Axis = Axis('Horizontal', self.__h_motor, self.__limiter_sw, self.__h_sensor)
        self.__v_axis: Axis = Axis('Vertical', self.__v_motor, self.__limiter_sw, self.__v_sensor)
        self.__product_dispenser = ProductDispenser(self.__pd_motor, self.__depth_motor, self.__limiter_sw)

        self.__initialize()


    def provide_product(self, product_id:int):
        self.__load_products_pos()
        v_pos, h_pos, depth, turns = self.__get_product_position(product_id)

        print(f"Providing product {v_pos}, {h_pos}, {depth}, {turns}")
        try:
            self.__enable_axes()

            self.__v_axis.move_to_position(v_pos)
            self.__h_axis.move_to_position(h_pos)
            self.__disable_axes()
            
            self.__product_dispenser.provide_product(depth, turns)

            self.__enable_axes()
            self.__h_axis.move_to_position(0)
            self.__v_axis.move_to_position(0)
        finally:
            self.__disable_axes()


    def __get_product_position(self, product_id: int):
        for product in self.__products:
            if product['id'] == product_id:
                return product["v_pos"], product["h_pos"], product["depth"], product["turns"]
        raise KeyError(f'Invalid product id {product_id}')
        

    def __initialize(self):
        try:
            self.__disable_axes()
            self.__product_dispenser.initialize()
            self.__enable_axes()
            self.__h_axis.initialize()
            self.__v_axis.initialize()
            # self.manual_mode_menu()
        finally:
            self.__disable_axes()

    def __load_products_pos(self):
        filename = f"./products_positions.json"
        try:
            data = None
            
            with open(filename, 'r') as file:
                data = json.load(file)
            
            if data is None:
                raise Exception('Invalid file')
            
            if 'products' in data:
                self.__products = data['products']
            else:
                print(f'Invalid products positions file for {self.__name}')
                self.__products = MotionSystemController.__DEFAULT_PRODUCTS
        except:
            self.__products = MotionSystemController.__DEFAULT_PRODUCTS

    def manual_mode_menu(self):
        try:
            while True:
                self.__disable_axes()
                print(f"{self.__v_axis.position()} {self.__h_axis.position()}")
                axis = input('axis:')
                steps = int(input("steps:"))
                if axis.lower() == 'v':
                    self.__enable_axes()
                    self.__v_axis.move(steps)
                elif axis.lower() == 'h':
                    self.__enable_axes()
                    self.__h_axis.move(steps)
                elif axis.lower() == 'd':
                    self.__depth_motor.step(steps)
                elif axis.lower() == 'p':
                    self.__pd_motor.step(steps)
                elif axis.lower() == 'pp':
                    self.provide_product(steps)
                elif axis.lower() == 'e':
                    break
        finally:
            self.__disable_axes()

    def __initialize_gpio(self):
        GPIO.setmode(GPIO.BCM)

        for pin in self.__config.default_high_pins():
            GPIO.setup(pin, GPIO.OUT)
            GPIO.output(pin, True)

        for pin in self.__config.default_low_pins():
            GPIO.setup(pin, GPIO.OUT)
            GPIO.output(pin, False)

        for pin in self.__config.input_pins():
            GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

    def __enable_axes(self):
        GPIO.output(self.__config.en_pin, False)
    
    def __disable_axes(self):
        GPIO.output(self.__config.en_pin, True)
        
