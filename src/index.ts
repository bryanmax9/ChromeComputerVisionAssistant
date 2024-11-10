import { z } from "zod";
import axios from "axios";
import * as robot from 'robotjs';
import { PythonShell } from 'python-shell';
import {
  defineDAINService,
  ToolConfig,
  ServiceConfig,
  ToolboxConfig,
  ServiceContext,
} from "@dainprotocol/service-sdk";

const scrollPage: ToolConfig = {
  id: "scrollPage",
  name: "Scroll Page",
  description: 
    "Send a request to an API to make it scroll up or down a page. \
    Use this when the user tells you to scroll up or down.",
  input: z
    .object({
      direction: z.enum(["up", "down"]).describe("Direction to scroll the page"),
    })
    .describe("Input parameters for the scroll request"),
  output: z
    .object({
      success: z.boolean().describe("Indicates if the scroll action was successful"),
      message: z.string().describe("Details about the scroll action"),
    })
    .describe("Scroll action response"),
  pricing: { pricePerUse: 0, currency: "USD" },
  handler: async ({ direction }, agentInfo) => {
    console.log(
      `User / Agent ${agentInfo.id} requested to scroll ${direction}`
    );

    try {
        // Pass the coordinates as arguments to the Python script
    const pyshell = new PythonShell('src/sample.py', {
      args: [direction],  // Passing the x and y coordinates
      mode: 'text'    // Output mode (can be 'text' or 'json')
    });

      // Listen for messages from the Python script
      pyshell.on('message', (message) => {
        console.log('Python script output:', message);
      });

      // End the Python shell and handle the results
      pyshell.end((err, code, signal) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Python script finished with code:', code, 'and signal:', signal);
        }
      });

      return {
        text: `Scrolled ${direction} successfully.`,
        data: {
          success: true,
          message: `Scrolled ${direction} successfully.`,
        },
        ui: {},
      };
    } catch (error) {
      console.error(`Error scrolling ${direction}:`, error);
      return {
        text: `Failed to scroll ${direction}.`,
        data: {
          success: false,
          message: error.message || `Failed to scroll ${direction}.`,
        },
        ui: {},
      };
    }
  },
};

const captureImageFromCamaera: ToolConfig = {
  id: "captureImageFromCamaera",
  name: "Capture image from the camera",
  description: 
    "open the camera app \
    do this when the user tells you to take a picture and analyze it",
  input: z
    .object({
      
    })
    .describe("Input parameters for the Camera capture request"),
  output: z
    .object({
      
    })
    .describe("response for camera capture"),
  pricing: { pricePerUse: 0, currency: "USD" },
  handler: async ({ }, agentInfo) => {
    console.log(
      `User / Agent ${agentInfo.id} requested to capture image from camera`
    );

    try {
        // Pass the coordinates as arguments to the Python script
    const pyshell = new PythonShell('src/cam.py', {
      mode: 'text'    // Output mode (can be 'text' or 'json')
    });

    

      // Listen for messages from the Python script
      pyshell.on('message', (message) => {
        console.log('Python script output:', message);
      });

      // End the Python shell and handle the results
      pyshell.end((err, code, signal) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Python script finished with code:', code, 'and signal:', signal);
        }
      });

      

      return {
        text: `Captured Image succesfully.`,
        data: {
          success: true,
          message: `Captured Image succesfully.`,
        },
        ui: {},
      };
    } catch (error) {
      console.error(`Error while capturing`, error);
      return {
        text: `Error while capturing`,
        data: {
          success: false,
          message: error.message || `Error while capturing`,
        },
        ui: {},
      };
    }
  },
};

const openWebPage: ToolConfig = {
  id: "openWebPage",
  name: "Open a website in the browser",
  description: 
    "Get the users request on which website it wants to open. convert it into the link and pass it through the python code for it to open the website on the browser. for example, if user requests google, input will be www.google.com",
  input: z
    .object({
      web: z.string().describe("Get the website link based on user's query"),
    })
    .describe("Input parameters for the webiste request"),
  output: z
    .object({
      success: z.boolean().describe("Indicates if the website was successful"),
      message: z.string().describe("Details about the website"),
    })
    .describe("website action response"),
  pricing: { pricePerUse: 0, currency: "USD" },
  handler: async ({ web }, agentInfo) => {
    console.log(
      `User / Agent ${agentInfo.id} requested to scroll ${web}`
    );

    try {
        // Pass the coordinates as arguments to the Python script
    const pyshell = new PythonShell('src/web.py', {
      args: [web],  // Passing the x and y coordinates
      mode: 'text'    // Output mode (can be 'text' or 'json')
    });

      // Listen for messages from the Python script
      pyshell.on('message', (message) => {
        console.log('Python script output:', message);
      });

      // End the Python shell and handle the results
      pyshell.end((err, code, signal) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Python script finished with code:', code, 'and signal:', signal);
        }
      });

      return {
        text: `Website ${web}  opened successfully.`,
        data: {
          success: true,
          message: `Website ${web}  opened successfully.`,
        },
        ui: {},
      };
    } catch (error) {
      console.error(`Error while opening ${web}:`, error);
      return {
        text: `Failed to open ${web}.`,
        data: {
          success: false,
          message: error.message || `Failed to open ${web}.`,
        },
        ui: {},
      };
    }
  },
};



const findLocation: ToolConfig = {
  id: "findLocation",
  name: "Find the location",
  description : "Your task is to automate the process of moving the mouse to a specific target location on the screen. First, " +
    "take a screenshot of the current screen and determine the current mouse position. Then, move the mouse to the " +
    "user-specified coordinates (x, y). After each movement, verify if the mouse position matches the target location. " +
    "If the mouse is not exactly at the target, repeat the process by taking another screenshot, " +
    "checking the current position, and moving the mouse again, until the mouse reaches the desired coordinates. " +
    "Ensure that the mouse movements are smooth and accurate, and the task stops once the mouse reaches the exact target position.",

  input: z
    .object({
      x: z.number().describe("Middle point of the button in x coordinate"),
      y: z.number().describe("Middle point of the button in y coordinate"),
    })
    .describe("Input parameters to describe the button"),
  output: z
    .object({
      success: z.boolean().describe("Indicates if the click action was successful"),
      message: z.string().describe("Details about the click action"),
    })
    .describe("Check if mouse pointer is on desired location"),
  pricing: { pricePerUse: 0, currency: "USD" },
  handler: async ({ x, y }, agentInfo) => {
    console.log(`User / Agent ${agentInfo.id} requested to click button at coordinates: (${x}, ${y})`);

    try {
      // Pass the coordinates as arguments to the Python script
    const pyshell = new PythonShell('src/find.py', {
      args: [x, y],  // Passing the x and y coordinates
      mode: 'text'    // Output mode (can be 'text' or 'json')
    });

    // Handle the message from the Python script
    pyshell.on('message', (message) => {
      console.log('Python script output:', message);
    });

    // Handle errors
    pyshell.on('stderr', (stderr) => {
      console.error('Error from Python script:', stderr);
    });

    // End the Python shell
    pyshell.end((err, code, signal) => {
      if (err) {
        console.error('Error executing Python script:', err);
      } else {
        console.log('Python script finished with code:', code);
      }
    });

      return {
        text: `Found the precise location.`,
        data: {
          success: true,
          message: `Successfully found the location`,
        },
        ui: {},
      };
    } catch (error) {
      console.error("Couldnt find the users's requested button to click on", error);
      return {
        text: `Failed t find the buttong`,
        data: {
          success: false,
          message: error.message || "Unknown error occurred.",
        },
        ui: {},
      };
    }
  },
};



const findAndClickButton: ToolConfig = {
  id: "findAndClickButton",
  name: "Find and Click Button",
  description:
    "Takes a screenshot, analyzes it to find a button matching the user's description, \
    and sends x and y coordinates of the button to the API to make it click the button. \
    Use this when the user tells you to click on a specific button on the web page and get a very precise location, take screenshots until the mouse is on the desired location.",
  input: z
    .object({
      x: z.number().describe("Middle point of the button in x coordinate"),
      y: z.number().describe("Middle point of the button in y coordinate"),
    })
    .describe("Input parameters to describe the button"),
  output: z
    .object({
      success: z.boolean().describe("Indicates if the click action was successful"),
      message: z.string().describe("Details about the click action"),
    })
    .describe("Button click response"),
  pricing: { pricePerUse: 0, currency: "USD" },
  handler: async ({ x, y }, agentInfo) => {
    console.log(`User / Agent ${agentInfo.id} requested to click button at coordinates: (${x}, ${y})`);

    try {
      // Pass the coordinates as arguments to the Python script
    const pyshell = new PythonShell('src/click.py', {
      args: [x, y],  // Passing the x and y coordinates
      mode: 'text'    // Output mode (can be 'text' or 'json')
    });

    // Handle the message from the Python script
    pyshell.on('message', (message) => {
      console.log('Python script output:', message);
    });

    // Handle errors
    pyshell.on('stderr', (stderr) => {
      console.error('Error from Python script:', stderr);
    });

    // End the Python shell
    pyshell.end((err, code, signal) => {
      if (err) {
        console.error('Error executing Python script:', err);
      } else {
        console.log('Python script finished with code:', code);
      }
    });

      return {
        text: `Clicked button successfully at (${x}, ${y}).`,
        data: {
          success: true,
          message: `Button clicked successfully.`,
        },
        ui: {},
      };
    } catch (error) {
      console.error("Error clicking button:", error);
      return {
        text: `Failed to click button at (${x}, ${y}).`,
        data: {
          success: false,
          message: error.message || "Unknown error occurred.",
        },
        ui: {},
      };
    }
  },
};


const dainService = defineDAINService({
  metadata: {
    title: "SightKicker",
    description:
      "A DAIN service for current weather and forecasts using Open-Meteo API",
    version: "1.0.0",
    author: "Your Name",
    tags: ["weather", "forecast", "dain"],
    logo: "https://cdn-icons-png.flaticon.com/512/252/252035.png"
  },
  identity: {
    apiKey: process.env.DAIN_API_KEY,
  },
  tools: [findAndClickButton, scrollPage, findLocation, openWebPage, captureImageFromCamaera],
});

dainService.startNode({ port: 2022 }).then(() => {
  console.log("Weather DAIN Service is running on port 2022");
});
