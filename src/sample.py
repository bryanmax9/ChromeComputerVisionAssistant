import webbrowser
import pyautogui
import time
import sys

# Open a website
# webbrowser.open("https://www.bloomberg.com/")
direction = sys.argv[1]
# Wait for the page to load
# pyautogui.click()
# Scroll down slowly by small increments
if(direction == "up"):
    pyautogui.scroll(1000)
    # for _ in range(20):  # Adjust the range for more or less scrolling
    #     pyautogui.scroll(50)  # Small scroll increments
    #     time.sleep(0.05)  # Small delay between scrolls
else:
    pyautogui.scroll(-1000)
    # for _ in range(20):  # Adjust the range for more or less scrolling
    #     pyautogui.scroll(-50)  # Small scroll increments
    #     time.sleep(0.05)  # Small delay between scrolls

# Coordinates for the click
# x_coord = 100  # replace with desired x-coordinate
# y_coord = 200  # replace with desired y-coordinate

# # Perform the click at the specified coordinates
# pyautogui.click(x=x_coord, y=y_coord)
