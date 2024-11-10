import sys
import pyautogui

# Get the coordinates (x, y) passed from Node.js
x = int(sys.argv[1])  # Convert the x coordinate to an integer
y = int(sys.argv[2])  # Convert the y coordinate to an integer
pyautogui.moveTo(x, y)