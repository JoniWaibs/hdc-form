import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { ApiError } from '@/app/api/v1/core/errors/ApiError'
import { ResponseBuilder } from '@/app/api/v1/core/responses/ResponseBuilder'

type RouteHandler = (req: NextRequest, ...args: unknown[]) => Promise<NextResponse> | NextResponse

const handleZodError = (error: ZodError) => {
  return ApiError.badRequest('Validation error', 'VALIDATION_ERROR', {
    errors: error.errors.map(err => ({
      path: err.path,
      message: err.message
    }))
  })
}

export const withErrorHandler = (handler: RouteHandler) => {
  return async (req: NextRequest, ...args: unknown[]) => {
    try {
      return await handler(req, ...args)
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseBuilder.error(handleZodError(error))
      }

      if (error instanceof ApiError) {
        return ResponseBuilder.error(error)
      }

      console.error('Unhandled error:', error)
      return ResponseBuilder.error(
        ApiError.internal('An unexpected error occurred')
      )
    }
  }
}
