import { AzureOpenAI } from "openai";

const deployment = process.env.DEPLOYMENT;

export const openaiClient = new AzureOpenAI({deployment})