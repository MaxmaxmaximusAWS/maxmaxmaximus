import { ReactEventHandler, useEffect, useState } from 'react'

const useKeyDown = (code: string, handler?: ReactEventHandler): boolean => {
  const [keyDowned, setKeyDowned] = useState<boolean>(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === code && !keyDowned) {
        setKeyDowned(true)
        if (handler) handler(event)
      }
    }

    const onKeyUp = (event) => {
      if (event.code === code && keyDowned) {
        setKeyDowned(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [code, keyDowned])

  return keyDowned
}

export default useKeyDown
