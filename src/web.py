import webbrowser
import pyautogui
import time
import sys

# Open a website
# webbrowser.open("https://www.bloomberg.com/")
web = sys.argv[1]
webbrowser.open(web)