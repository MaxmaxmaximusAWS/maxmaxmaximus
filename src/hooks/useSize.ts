import { useRef, useState, useEffect, useMemo, RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface Size {
  left: number
  top: number
  width: number
  height: number
}

const useSize = <T>(): [RefObject<T>, Size] => {
  const ref = useRef<T>(null)

  const [size, setSize] = useState<Size>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  const observer = useMemo(() => {
    return new ResizeObserver(([entry]) => {
      const { contentRect } = entry

      setSize({
        left: contentRect.left,
        top: contentRect.top,
        width: contentRect.width,
        height: contentRect.height,
      })
    })
  }, [])

  useEffect(() => {
    if (ref.current instanceof Element) {
      observer.observe(ref.current)
      return () => {
        try {
          observer.disconnect()
        } catch (e) {}
      }
    }
  }, [ref.current])

  return [ref, size]
}

export default useSize
