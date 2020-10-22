import { useEffect } from 'react'

const useWindowEvent = (event, handler) => {
  useEffect(() => {
    const onPointerDown = (event) => {
      handler(event)
    }

    window.addEventListener(event, onPointerDown)

    return () => {
      window.removeEventListener(event, onPointerDown)
    }
  }, [handler])
}

export default useWindowEvent
