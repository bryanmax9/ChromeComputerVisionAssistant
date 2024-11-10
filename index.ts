import { z } from "zod";
import axios from "axios";

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
    const url = `https://browser-control-hacksc.onrender.com/scroll?action=scroll&direction=${direction}`;
    try {
      const response = await axios.post(url);
      return {
        text: `Scrolled ${direction} successfully.`,
        data: {
          success: true,
          message: response.data.message || `Scrolled ${direction} successfully.`,
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

const findAndClickButton: ToolConfig = {
  id: "findAndClickButton",
  name: "Find and Click Button",
  description:
    "Takes a screenshot, analyzes it to find a button matching the user's description, \
    and sends x and y coordinates of the button to the API to make it click the button. \
    Use this when the user tells you to click on a specific button on the web page.",
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
      const clickUrl = `https://browser-control-hacksc.onrender.com/click?action=click&x=${x}&y=${y}`;
      await axios.post(clickUrl);

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
    title: "Weather DAIN Service",
    description:
      "A DAIN service for current weather and forecasts using Open-Meteo API",
    version: "1.0.0",
    author: "Your Name",
    tags: ["weather", "forecast", "dain"],
  },
  identity: {
    apiKey: process.env.DAIN_API_KEY,
  },
  tools: [scrollPage, findAndClickButton],
});

dainService.startNode({ port: 2022 }).then(() => {
  console.log("Weather DAIN Service is running on port 2022");
});