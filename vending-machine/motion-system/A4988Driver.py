# System imports
import RPi.GPIO as GPIO
from time import sleep

class A4988Driver:

    __DIR_CW = 1
    __DIR_CCW = 0

    def __init__(self, step_pin, dir_pin = None, en_pin = None, delay=0.208, steps_per_revolution=200):

        # Configure instance
        self.CLOCKWISE = self.__DIR_CW
        self.ANTI_CLOCKWISE = self.__DIR_CCW
        self.step_pin = step_pin
        self.dir_pin = dir_pin
        self.en_pin = en_pin
        self.delay = delay
        self.steps_per_revolution = steps_per_revolution

    def step(self, stepsToTake, direction = __DIR_CW):

        print("Step Pin: " + str(self.step_pin) + " Direction Pin: " + str(self.dir_pin) + " delay: " + str(self.delay))
        print("Taking " + str(stepsToTake) + " steps.")

        # Set the direction
        print(self.dir_pin, direction)
        GPIO.output(self.dir_pin, direction)#self.dir_pin, GPIO.LOW if direction == self.CLOCKWISE else GPIO.HIGH)
        GPIO.output(self.en_pin, GPIO.LOW)

        # Take requested number of steps
        for x in range(stepsToTake):
            # print("Step " + str(x))
            GPIO.output(self.step_pin, GPIO.HIGH)
            sleep(self.delay)
            GPIO.output(self.step_pin, GPIO.LOW)
            sleep(self.delay)
        GPIO.output(self.step_pin, GPIO.LOW)

        GPIO.output(self.en_pin, GPIO.HIGH)




if __name__ == '__main__':
    try:
        # Define pins
        STEP_PIN_V = 22
        STEP_PIN_H = 4
        DIRECTION_PIN = 27
        EN_PIN = 17
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        # Setup gpio pins
        GPIO.setup(STEP_PIN_H, GPIO.OUT)
        GPIO.setup(STEP_PIN_V, GPIO.OUT)
        GPIO.setup(DIRECTION_PIN, GPIO.OUT)
        GPIO.setup(EN_PIN, GPIO.OUT)
        # Create a new instance of our stepper class (note if you're just starting out with this you're probably better off using a delay of ~0.1)
        stepperHandlerV = A4988Driver(STEP_PIN_V, DIRECTION_PIN, EN_PIN, 0.0005)#0.0005
        stepperHandlerH = A4988Driver(STEP_PIN_H, DIRECTION_PIN, EN_PIN, 0.0005)#0.0005

        # Go forwards once
        #stepperHandler.Step(100)

        # Go backwards once
        N=5
        P=50
        while True:
            axis = input('axis:')
            steps = int(input("steps:"))
            if axis.lower() == 'v':
                stepperHandlerV.step(abs(steps), stepperHandlerV.ANTI_CLOCKWISE if steps > 0 else stepperHandlerV.CLOCKWISE)
            elif axis.lower() == 'h':
                stepperHandlerH.step(abs(steps), stepperHandlerH.ANTI_CLOCKWISE if steps > 0 else stepperHandlerH.CLOCKWISE)
            print(axis, 'CCW' if steps > 0 else 'CW')
            

        stepperHandler.step(N*P*2, stepperHandler.CLOCKWISE)

        stepperHandler.step(N*P, stepperHandler.ANTI_CLOCKWISE)
    finally:
        GPIO.cleanup()