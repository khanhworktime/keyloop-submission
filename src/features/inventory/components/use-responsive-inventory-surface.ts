import { useSyncExternalStore } from 'react'

const query = '(min-width: 768px)'

const getSnapshot = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(query).matches

const subscribe = (onChange: () => void): (() => void) => {
  const media = window.matchMedia(query)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

export const useDesktopInventorySurface = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, () => false)
