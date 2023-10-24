import signal                   
import sys
import RPi.GPIO as GPIO

LIMIT_BTN_GPIO = 24
IR_SENSOR_H_GPIO = 3
IR_SENSOR_V_GPIO = 2

def signal_handler(sig, frame):
    GPIO.cleanup()
    sys.exit(0)

def switch_callback(channel):
    if not GPIO.input(LIMIT_BTN_GPIO):
        print("Limit pressed!")
    else:
        print("Limit released!")

def ir_h_callback(channel):
    if not GPIO.input(IR_SENSOR_H_GPIO):
        print("IR H pressed!")
    else:
        print("IR H released!")
    
def ir_v_callback(channel):
    if not GPIO.input(IR_SENSOR_V_GPIO):
        print("IR V pressed!")
    else:
        print("IR V released!")

if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(LIMIT_BTN_GPIO, GPIO.IN)
    GPIO.setup(IR_SENSOR_H_GPIO, GPIO.IN)
    GPIO.setup(IR_SENSOR_V_GPIO, GPIO.IN)
    
    GPIO.add_event_detect(LIMIT_BTN_GPIO, GPIO.BOTH, 
            callback=switch_callback, bouncetime=50)
    GPIO.add_event_detect(IR_SENSOR_H_GPIO, GPIO.BOTH, 
            callback=ir_h_callback, bouncetime=50)
    GPIO.add_event_detect(IR_SENSOR_V_GPIO, GPIO.BOTH, 
            callback=ir_v_callback, bouncetime=50)
    
    signal.signal(signal.SIGINT, signal_handler)
    signal.pause()