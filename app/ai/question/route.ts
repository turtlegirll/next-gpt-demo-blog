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

import { NextResponse } from "next/server"

export async function POST(request: Request) {

    let response: SuccessResponse | ErrorResponse;

    try {
        const res = await request.json()
        
        response = {
            success: true,
            message: res,
            status: 200
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