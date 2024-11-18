import OpenAI from "openai";

export const extractModelMessage = (completion: OpenAI.ChatCompletion) => {
    return completion.choices[0]?.message?.content;
}
