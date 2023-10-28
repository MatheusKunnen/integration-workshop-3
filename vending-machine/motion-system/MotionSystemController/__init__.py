import platform

if platform.machine() in ['aarch', 'armv7l']:
    from .MotionSystemController import *
else:
    from .Mock import *