from .MotionSystemConfiguration import MotionSystemConfiguration
from .Axis import Axis
from .A4988Driver import A4988Driver
from .ULN2003Driver import ULN2003Driver
from .StepperDriver import *
from .LimiterSwitch import LimiterSwitch
from .ReflectanceSensor import ReflectanceSensor
from .ProductDispenser import ProductDispenser
from .MotionSystemMonitor import MotionSystemMonitor

from multiprocessing import Process, Queue
import json

try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO
    
class MotionSystemController:

    __DEFAULT_PRODUCTS = [
        {"id": 1, "v_pos": 450, "h_pos": 450, "depth":4096*7, "turns":4096+1024},
        {"id": 2, "v_pos": 450, "h_pos": 2825, "depth":4096*7, "turns":4096+1024},
        {"id": 3, "v_pos": 450, "h_pos": 5225, "depth":4096*7, "turns":4096+1024},
        {"id": 4, "v_pos": 4850, "h_pos": 450, "depth":4096*7, "turns":4096+1024},
        {"id": 5, "v_pos": 4850, "h_pos": 2825, "depth":4096*7, "turns":4096+1024},
        {"id": 6, "v_pos": 4850, "h_pos": 5225, "depth":4096*5, "turns":4096+1024},
    ]

    def __init__(self, config: MotionSystemConfiguration):
        self.__products = MotionSystemController.__DEFAULT_PRODUCTS
        self.__config = config

        self.__initialize_gpio()

        self.__h_motor: StepperDriver = A4988Driver(config.step_pin_h, config.dir_pin)
        self.__v_motor: StepperDriver = A4988Driver(config.step_pin_v, config.dir_pin)

        self.__pd_motor: StepperDriver = ULN2003Driver(config.pd_motor_pins)
        self.__depth_motor: StepperDriver = ULN2003Driver(config.depth_motor_pins)

        self.__limiter_sw: LimiterSwitch = LimiterSwitch(config.limiter_pin)
        self.__h_sensor: ReflectanceSensor = ReflectanceSensor(config.sensor_pin_h, 'Horizontal')
        self.__v_sensor: ReflectanceSensor = ReflectanceSensor(config.sensor_pin_v, 'Vertical')

        self.__h_axis: Axis = Axis('Horizontal', self.__h_motor, self.__limiter_sw, self.__h_sensor)
        self.__v_axis: Axis = Axis('Vertical', self.__v_motor, self.__limiter_sw, self.__v_sensor)
        self.__product_dispenser = ProductDispenser(self.__pd_motor, self.__depth_motor, self.__limiter_sw)

        self.__monitor = MotionSystemMonitor(self.__limiter_sw, self.__config.en_pin)

        self.__req_queue = Queue()
        self.__res_queue = Queue()

        self.__process = Process(name="motion-system-controller", target=self.__process_entry, daemon=True)

        self.__monitor.start()
        self.__process.start()


    def provide_product(self, product_id:int):
        while not self.__res_queue.empty():
            self.__res_queue.get(timeout=0.01)
        print(f'Product {product_id} addded to queue')
        self.__req_queue.put(product_id)
        
        success, msg = self.__res_queue.get(block=True)
        print('Product', success, msg)
        if not success:
            raise Exception(msg)
        
        return success


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

    def __process_entry(self):
        print('Motion System Controller thread started')

        print('Initializing motion system')
        self.__initialize()
        
        while True:
            try:
                product_id = self.__req_queue.get(block=True)

                self.__load_products_pos()
                v_pos, h_pos, depth, turns = self.__get_product_position(product_id)
                res_send = False
                print(f"Providing product {v_pos}, {h_pos}, {depth}, {turns}")
                try:
                    self.__enable_axes(True)

                    can_use_axes_queue = self.__can_use_axes_queue(v_pos, h_pos)

                    self.__v_axis.move_to_position(v_pos, queue=can_use_axes_queue)
                    self.__h_axis.move_to_position(h_pos, queue=can_use_axes_queue)

                    self.__v_axis.join()
                    self.__h_axis.join()

                    self.__disable_axes()
                    
                    self.__product_dispenser.provide_product(depth, turns)
                    
                    self.__res_queue.put((True, product_id))
                    res_send = True

                    self.__product_dispenser.home(depth)

                    if self.__req_queue.empty():
                        self.__enable_axes(True)
                        self.__h_axis.move_to_position(0, queue=True)
                        self.__v_axis.move_to_position(0, queue=True)
                        self.__v_axis.join()
                        self.__h_axis.join()
                        self.__enable_axes(False)
                        self.__v_axis.home()
                        self.__h_axis.home()
                except Exception as e:
                    if not res_send:
                        self.__res_queue.put((False, str(e)))
                finally:
                    self.__disable_axes()
            except Exception as e:
                print(e)
                if not res_send:
                    self.__res_queue.put((False, str(e)))

    def __can_use_axes_queue(self, v_pos:int, h_pos:int):
        v_steps = v_pos - self.__v_axis.position() 
        h_steps = h_pos - self.__h_axis.position() 
        return v_steps == 0 or h_steps == 0 or (v_steps > 0 and h_steps > 0) or (v_steps < 0 and h_steps < 0)

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

    def __enable_axes(self, safe_mode=False):
        GPIO.output(self.__config.en_pin, False)
        if safe_mode:
            self.__monitor.enable_safe_mode()
        else:
            self.__monitor.disable_safe_mode()
    
    def __disable_axes(self):
        GPIO.output(self.__config.en_pin, True)
        self.__monitor.disable_safe_mode()
        
