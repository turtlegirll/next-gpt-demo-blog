import { AzureOpenAI } from "openai";
import OpenAI from 'openai';

const deployment = process.env.DEPLOYMENT;
const apiKey= process.env['OPENAI_API_KEY'];
const endpoint= process.env['OPENAI_API_ENDPOINT'];
const apiVersion= process.env['OPENAI_API_VERSION'];

export const openaiClient = new AzureOpenAI({deployment,apiKey,endpoint,apiVersion});