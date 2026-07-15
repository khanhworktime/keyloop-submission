import { delay, http, HttpResponse, type RequestHandler } from 'msw'

import { InventoryRepositoryError, type InventoryRepository } from '../domain/inventory-repository'
import type { InventoryUnitId } from '../domain/inventory-types'
import { CORRELATION_ID_HEADER } from '../lib/api-client'
import type { ApiErrorBody, ApiSuccess } from '../lib/api-contracts'
import { parseRecordActionRequest } from './api/action-body-parser'
import { parseActivityFilters } from './api/activity-query-parser'
import { parseInventoryFilters } from './api/inventory-query-parser'
import { RequestValidationError } from './api/request-validation-error'
import { parseUpdateInventoryUnitRequest } from './api/unit-update-body-parser'
import { logMockRequest } from './mock-telemetry'

export interface MockHandlerOptions {
  delayMs?: () => number
  actor?: string
}

interface ErrorResponse {
  body: ApiErrorBody
  status: number
}

const correlationIdFor = (request: Request): string =>
  request.headers.get(CORRELATION_ID_HEADER) ?? globalThis.crypto.randomUUID()

const parseUnitId = (value: string | readonly string[] | undefined): InventoryUnitId => {
  if (typeof value !== 'string' || !/^IU-[A-Za-z0-9-]+$/.test(value)) {
    throw new RequestValidationError([
      { field: 'unitId', message: 'A valid Inventory Unit ID is required.' },
    ])
  }
  return value as InventoryUnitId
}

const parseActionBody = async (request: Request) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    throw new RequestValidationError([
      { field: 'body', message: 'Request body must be valid JSON.' },
    ])
  }
  return parseRecordActionRequest(body)
}

const parseUnitUpdateBody = async (request: Request) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    throw new RequestValidationError([
      { field: 'body', message: 'Request body must be valid JSON.' },
    ])
  }
  return parseUpdateInventoryUnitRequest(body)
}

const mapError = (error: unknown, correlationId: string): ErrorResponse => {
  if (error instanceof RequestValidationError) {
    return {
      status: 400,
      body: {
        error: { code: 'INVALID_REQUEST', message: error.message, fieldErrors: error.fieldErrors },
        correlationId,
      },
    }
  }

  if (error instanceof InventoryRepositoryError) {
    const status = error.code === 'UNIT_NOT_FOUND'
      ? 404
      : error.code === 'DUPLICATE_VIN' || error.code === 'DUPLICATE_STOCK_NUMBER'
        ? 409
        : error.code === 'UNIT_NOT_AGING' || error.code === 'INVALID_ACTION' || error.code === 'NOTE_TOO_LONG' || error.code === 'INVALID_UNIT'
          ? 422
          : 500
    return {
      status,
      body: { error: { code: error.code, message: error.message }, correlationId },
    }
  }

  return {
    status: 500,
    body: {
      error: { code: 'INTERNAL_ERROR', message: 'Inventory data is temporarily unavailable.' },
      correlationId,
    },
  }
}

const execute = async <T>(options: {
  request: Request
  delayMs: () => number
  status?: number
  work: () => Promise<T> | T
}): Promise<HttpResponse<ApiSuccess<T> | ApiErrorBody>> => {
  const startedAt = performance.now()
  const correlationId = correlationIdFor(options.request)
  const pathname = new URL(options.request.url).pathname
  await delay(options.delayMs())

  try {
    const data = await options.work()
    const status = options.status ?? 200
    logMockRequest({
      correlationId,
      durationMs: Math.round(performance.now() - startedAt),
      method: options.request.method,
      pathname,
      status,
    })
    return HttpResponse.json(
      { data },
      { status, headers: { [CORRELATION_ID_HEADER]: correlationId } },
    )
  } catch (error) {
    const response = mapError(error, correlationId)
    logMockRequest({
      correlationId,
      durationMs: Math.round(performance.now() - startedAt),
      method: options.request.method,
      pathname,
      status: response.status,
    })
    return HttpResponse.json(response.body, {
      status: response.status,
      headers: { [CORRELATION_ID_HEADER]: correlationId },
    })
  }
}

export const createMockHandlers = (
  repository: InventoryRepository,
  options: MockHandlerOptions = {},
): RequestHandler[] => {
  const delayMs = options.delayMs ?? (() => 250 + Math.floor(Math.random() * 401))
  const actor = options.actor ?? 'Manager'

  return [
    http.get('*/api/overview', ({ request }) =>
      execute({ request, delayMs, work: () => repository.getOverview() }),
    ),
    http.get('*/api/inventory', ({ request }) =>
      execute({
        request,
        delayMs,
        work: () => repository.getInventory(parseInventoryFilters(new URL(request.url).searchParams)),
      }),
    ),
    http.get('*/api/inventory/:unitId', ({ request, params }) =>
      execute({ request, delayMs, work: () => repository.getUnit(parseUnitId(params.unitId)) }),
    ),
    http.patch('*/api/inventory/:unitId', ({ request, params }) =>
      execute({
        request,
        delayMs,
        work: async () => {
          const body = await parseUnitUpdateBody(request)
          return repository.updateUnit({ unitId: parseUnitId(params.unitId), ...body, actor })
        },
      }),
    ),
    http.post('*/api/inventory/:unitId/actions', ({ request, params }) =>
      execute({
        request,
        delayMs,
        status: 201,
        work: async () => {
          const body = await parseActionBody(request)
          return repository.recordAction({
            unitId: parseUnitId(params.unitId),
            action: body.action,
            note: body.note,
            actor,
          })
        },
      }),
    ),
    http.get('*/api/activity', ({ request }) =>
      execute({
        request,
        delayMs,
        work: () => repository.getActivity(parseActivityFilters(new URL(request.url).searchParams)),
      }),
    ),
  ]
}
