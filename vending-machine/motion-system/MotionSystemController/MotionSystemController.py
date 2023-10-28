from .A4988Driver import A4988Driver
import RPi.GPIO as GPIO

class MotionSystemController:
    def __init__(self):
        pass

    def provide_product(self, product_id:int):
        pass

print('here')
GPIO.setmode(GPIO.BCM)

if __name__ == '__main__':
    try:
        # Define pins
        STEP_PIN_V = 4
        STEP_PIN_H = 22
        DIRECTION_PIN = 27
        EN_PIN = 17
        LIMIT_BTN_GPIO = 24

        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        # Setup gpio pins
        GPIO.setup(STEP_PIN_H, GPIO.OUT)
        GPIO.setup(STEP_PIN_V, GPIO.OUT)
        GPIO.setup(DIRECTION_PIN, GPIO.OUT)
        GPIO.setup(EN_PIN, GPIO.OUT)
        
        GPIO.setup(LIMIT_BTN_GPIO, GPIO.IN)

        GPIO.output(EN_PIN, GPIO.HIGH)

        stepperHandlerV = A4988Driver(STEP_PIN_V, DIRECTION_PIN, EN_PIN, 0.0005)#0.0005
        stepperHandlerH = A4988Driver(STEP_PIN_H, DIRECTION_PIN, EN_PIN, 0.0005)#0.0005

        V_MAX_STEPS = -1
        H_MAX_STEPS = -1

        if GPIO.input(LIMIT_BTN_GPIO):
            raise Exception('Limit switch already pressed')
        
        STEPS_PER_MM = 25
        D_STEP = 25 # 1mm
        SAFE_STEPS = 125 # 4mm

        steps_up = 0
        while not GPIO.input(LIMIT_BTN_GPIO):
            stepperHandlerV.step(D_STEP, stepperHandlerV.CLOCKWISE) # Moves up
            steps_up += D_STEP

        print(f'Top found after {steps_up} steps ({steps_up/STEPS_PER_MM}mm)')
        stepperHandlerV.step(SAFE_STEPS, stepperHandlerV.ANTI_CLOCKWISE) # Moves down
        
        if GPIO.input(LIMIT_BTN_GPIO):
            raise Exception('Vertical axis jammed :(')
        
        steps_down = 0
        while not GPIO.input(LIMIT_BTN_GPIO):
            stepperHandlerV.step(D_STEP, stepperHandlerV.ANTI_CLOCKWISE) # Moves down
            steps_down += D_STEP

        print(f'Bottom found after {steps_down} steps ({steps_down/STEPS_PER_MM}mm)')
        stepperHandlerV.step(SAFE_STEPS, stepperHandlerV.CLOCKWISE) # Moves up

        if GPIO.input(LIMIT_BTN_GPIO):
            raise Exception('Vertical axis jammed :(')
        VERTICAL_MAX_STEPS = steps_down - SAFE_STEPS
        print(f'Vertical axis limit 0-{VERTICAL_MAX_STEPS} steps | {VERTICAL_MAX_STEPS/STEPS_PER_MM}')

        # Horizontal axis
        steps_right = 0
        while not GPIO.input(LIMIT_BTN_GPIO):
            stepperHandlerH.step(D_STEP, stepperHandlerH.CLOCKWISE) # Moves rigth
            steps_right += D_STEP

        print(f'Right found after {steps_right} steps ({steps_right/STEPS_PER_MM}mm)')
        stepperHandlerH.step(SAFE_STEPS, stepperHandlerH.ANTI_CLOCKWISE) # Moves left
        
        if GPIO.input(LIMIT_BTN_GPIO):
            raise Exception('Horizontal axis jammed :(')
        
        steps_left = 0
        while not GPIO.input(LIMIT_BTN_GPIO):
            stepperHandlerH.step(D_STEP, stepperHandlerH.ANTI_CLOCKWISE) # Moves left
            steps_left += D_STEP

        print(f'Left found after {steps_left} steps ({steps_left/STEPS_PER_MM}mm)')
        stepperHandlerH.step(SAFE_STEPS, stepperHandlerH.CLOCKWISE) # Moves right

        if GPIO.input(LIMIT_BTN_GPIO):
            raise Exception('Horizontal axis jammed :(')
        HORIZONTAL_MAX_STEPS = steps_left - SAFE_STEPS

        print(f'Vertical axis limit 0-{VERTICAL_MAX_STEPS} steps | {VERTICAL_MAX_STEPS/STEPS_PER_MM}')
        print(f'Horizontal axis limit 0-{HORIZONTAL_MAX_STEPS} steps | {HORIZONTAL_MAX_STEPS/STEPS_PER_MM}')

        stepperHandlerV.step(VERTICAL_MAX_STEPS, stepperHandlerV.CLOCKWISE) # Moves up
        stepperHandlerH.step(HORIZONTAL_MAX_STEPS, stepperHandlerH.CLOCKWISE) # Moves right
        stepperHandlerV.step(VERTICAL_MAX_STEPS, stepperHandlerV.ANTI_CLOCKWISE) # Moves down
        stepperHandlerH.step(HORIZONTAL_MAX_STEPS, stepperHandlerH.ANTI_CLOCKWISE) # Moves left

        while True:
            axis = input('axis:')
            steps = int(input("steps:"))
            if axis.lower() == 'v':
                stepperHandlerV.step(abs(steps), stepperHandlerV.ANTI_CLOCKWISE if steps < 0 else stepperHandlerV.CLOCKWISE)
            elif axis.lower() == 'h':
                stepperHandlerH.step(abs(steps), stepperHandlerH.ANTI_CLOCKWISE if steps < 0 else stepperHandlerH.CLOCKWISE)
            print(axis, 'CCW' if steps > 0 else 'CW')

    finally:
        GPIO.cleanup()