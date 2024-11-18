import { AzureOpenAI } from "openai";

const apiVersion = process.env.OPENAI_API_VERSION;
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.DEPLOYMENT;

export const openaiClient = new AzureOpenAI({apiVersion, endpoint, apiKey, deployment})