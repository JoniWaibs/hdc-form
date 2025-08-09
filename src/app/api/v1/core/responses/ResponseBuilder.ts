import { NextResponse } from 'next/server'
import { ApiError } from '@/app/api/v1/core/errors/ApiError'
import { ApiSuccessResponse, ApiErrorResponse } from '@/app/api/v1/core/responses/ApiResponse'

export class ResponseBuilder {
  static success<T>(data: T, message?: string): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
      message
    })
  }

  static error(error: ApiError): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code || "INTERNAL_ERROR",
          message: error.message || "An unexpected error occurred",
          details: error.details || "No details provided",
        },
      },
      { status: error.statusCode }
    );
  }
}
