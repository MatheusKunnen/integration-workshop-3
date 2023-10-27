import platform

if platform.machine() in ['aarch', 'armv7l']:
    from MotionSystemController import MotionSystemController
else:
    from MotionSystemController.Mock import MotionSystemController