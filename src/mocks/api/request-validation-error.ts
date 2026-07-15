import type { ApiFieldError } from '../../lib/api-contracts'

export class RequestValidationError extends Error {
  readonly fieldErrors: ApiFieldError[]

  constructor(fieldErrors: ApiFieldError[]) {
    super('One or more request values are invalid.')
    this.name = 'RequestValidationError'
    this.fieldErrors = fieldErrors
  }
}

export const readBoundedText = (
  value: string | null,
  field: string,
  maximumLength: number,
): string | undefined => {
  const normalized = value?.trim()
  if (!normalized) {
    return undefined
  }
  if (normalized.length > maximumLength) {
    throw new RequestValidationError([
      { field, message: `Must be ${maximumLength} characters or fewer.` },
    ])
  }
  return normalized
}

export const readPositiveInteger = (
  value: string | null,
  field: string,
  fallback: number,
): number => {
  if (value === null || value === '') {
    return fallback
  }
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new RequestValidationError([{ field, message: 'Must be a positive integer.' }])
  }
  return parsed
}
