import subprocess
import time
import platform
import pygetwindow as gw  # For managing window focus (Windows only)

def open_camera_resized():
    system = platform.system()
    
    # Open camera application based on OS
    if system == "Windows":
        # Command to open the camera on Windows
        process = subprocess.Popen("start microsoft.windows.camera:", shell=True)
        time.sleep(2)  # Wait for the camera to open
        
        # Get the Camera window and resize it to 900x900
        try:
            window = gw.getWindowsWithTitle('Camera')[0]  # Get the camera window
            window.activate()  # Bring it to the front
            window.resizeTo(900, 900)  # Resize window to 900x900
        except IndexError:
            print("Camera window not found.")

    elif system == "Darwin":
        # Command to open Photo Booth on macOS
        process = subprocess.Popen(["open", "-a", "Photo Booth"])
        time.sleep(2)  # Wait for the camera to open
        
        # Resize the Photo Booth window to 900x900 using AppleScript
        apple_script = '''
        tell application "Photo Booth"
            activate
            set bounds of window 1 to {0, 0, 900, 900}
        end tell
        '''
        subprocess.Popen(["osascript", "-e", apple_script])  # Resize Photo Booth to 900x900

        # Ensure Photo Booth is on top
        subprocess.Popen('osascript -e "tell application \\"Photo Booth\\" to activate"')

    elif system == "Linux":
        # Command to open Cheese on Linux
        process = subprocess.Popen(["cheese"])
        time.sleep(2)  # Wait for the camera to open
        
        # Resize the Cheese window to 900x900 using xdotool
        subprocess.Popen(["xdotool", "search", "--name", "cheese", "windowmove", "0", "0", "windowsize", "900", "900"])

        # Bring the Cheese window to the front
        subprocess.Popen(["xdotool", "search", "--name", "cheese", "windowactivate"])

    else:
        print("Unsupported OS.")
        return

    # Keep the camera app open for 30 seconds
    try:
        time.sleep(30)
    finally:
        # Close the camera application after 30 seconds
        process.terminate()
        if system == "Windows":
            subprocess.Popen("taskkill /IM WindowsCamera.exe /F", shell=True)
        elif system == "Darwin":
            subprocess.Popen(["pkill", "Photo Booth"])
        elif system == "Linux":
            subprocess.Popen(["pkill", "cheese"])

# Run the function
open_camera_resized()
