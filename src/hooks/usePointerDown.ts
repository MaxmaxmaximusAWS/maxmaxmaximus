import useWindowEvent from './useWindowEvent'
import { useCallback } from 'react'

const usePointerDown = (handler) => {
  const onPointerDown = useCallback(
    (event) => {
      if (event.button === 0) {
        handler(event)
      }
    },
    [handler]
  )

  useWindowEvent('pointerdown', onPointerDown)
}

export default usePointerDown
