import axios from 'axios'

import type { ApiErrorBody, ApiFieldError } from './api-contracts'

export class ApiError extends Error {
  readonly code: string
  readonly correlationId?: string
  readonly fieldErrors: ApiFieldError[]
  readonly status?: number

  constructor(options: {
    message: string
    code?: string
    correlationId?: string
    fieldErrors?: ApiFieldError[]
    status?: number
  }) {
    super(options.message)
    this.name = 'ApiError'
    this.code = options.code ?? 'UNKNOWN_ERROR'
    this.correlationId = options.correlationId
    this.fieldErrors = options.fieldErrors ?? []
    this.status = options.status
  }
}

const isApiErrorBody = (value: unknown): value is ApiErrorBody => {
  if (typeof value !== 'object' || value === null || !('error' in value)) {
    return false
  }

  const error = value.error
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string' &&
    'message' in error &&
    typeof error.message === 'string'
  )
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error
  }

  if (axios.isAxiosError(error) && isApiErrorBody(error.response?.data)) {
    return new ApiError({
      message: error.response.data.error.message,
      code: error.response.data.error.code,
      correlationId: error.response.data.correlationId,
      fieldErrors: error.response.data.error.fieldErrors,
      status: error.response.status,
    })
  }

  return new ApiError({
    message: 'The request could not be completed. Please try again.',
  })
}
