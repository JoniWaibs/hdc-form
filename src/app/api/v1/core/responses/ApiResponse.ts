import { ApiResponse, ApiSuccessResponse } from "@/app/api/v1/core/types/api";

export const isSuccessResponse = <T>(
  response: ApiResponse<T>,
): response is ApiSuccessResponse<T> => response.success;
