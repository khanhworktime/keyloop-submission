import { useEffect, useState } from 'react'

export const useDesktopDrawer = (): boolean => {
  const [desktop, setDesktop] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(min-width: 768px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = (): void => setDesktop(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return desktop
}
