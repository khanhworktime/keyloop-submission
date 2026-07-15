export interface MockRequestTelemetry {
  correlationId: string
  durationMs: number
  method: string
  pathname: string
  status: number
}

export const logMockRequest = (telemetry: MockRequestTelemetry): void => {
  console.info(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level: telemetry.status >= 500 ? 'error' : 'info',
      request_id: telemetry.correlationId,
      action: `${telemetry.method} ${telemetry.pathname}`,
      duration_ms: telemetry.durationMs,
      status_code: telemetry.status,
      message: 'Mock API request completed.',
    }),
  )
}
