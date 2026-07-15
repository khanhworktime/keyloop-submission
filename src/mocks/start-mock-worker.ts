let workerStartPromise: Promise<void> | undefined

export const startMockWorker = async (): Promise<void> => {
  workerStartPromise ??= import('./browser')
    .then(({ mockWorker }) => mockWorker.start({ onUnhandledRequest: 'bypass' }))
    .then(() => undefined)
  await workerStartPromise
}
