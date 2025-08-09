export type ApiSuccessResponse<T> = {
  success: true
  data: T
  message?: string
}

export type ApiErrorResponse = {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export const isSuccessResponse = <T>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> => response.success
