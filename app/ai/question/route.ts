import { NextResponse } from "next/server"
import { openaiClient } from "lib/openai/client"
import { extractModelMessage } from "lib/utils"
import { getBlogPost } from "app/blog/utils"

type SuccessResponse = {
    success: true,
    message: string,
    status: number
}

type ErrorResponse = {
    success: false,
    message: string,
    status: number
}

export async function POST(request: Request) {

    let response: SuccessResponse | ErrorResponse;

    try {
        const { question, articleSlug } = await request.json()

        const articleContent = getBlogPost(articleSlug)?.content;

        let modelResponse = await openaiClient.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: `You are a world expert article summarizer. Answer a question about the following article: ${articleContent}. Reference it in your response.` },
                { role: 'user', content: JSON.stringify({ question }) },
            ],
        });

        const modelMessage = extractModelMessage(modelResponse);

        if (!modelMessage) {
            response = {
                success: false,
                message: 'No message found in model response',
                status: 500
            }
        }
        else {
            response = {
                success: true,
                message: modelMessage,
                status: 200
            }
        }

    } catch (error) {
        response = {
            success: false,
            message: error.message,
            status: 500
        }
    }
    return NextResponse.json(response)
}