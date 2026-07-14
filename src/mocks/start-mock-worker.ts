let workerStartPromise: Promise<void> | undefined

export const startMockWorker = async (): Promise<void> => {
  if (!__DEV__) {
    return
  }

  workerStartPromise ??= import('./browser')
    .then(({ mockWorker }) => mockWorker.start({ onUnhandledRequest: 'bypass' }))
    .then(() => undefined)
  await workerStartPromise
}
