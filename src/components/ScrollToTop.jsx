import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Jumps back to the top whenever the route changes. Renders nothing. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
