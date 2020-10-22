import { RefObject, useEffect, useState } from 'react'
import PhysicalObject from '../lib/PhysicalObject'

export declare type PhysicalObjectRef = RefObject<PhysicalObject>
export declare type FellChangeHandler = ((isFell: boolean) => void) | null

const useObjectIsFell = (
  ref: PhysicalObjectRef,
  onFellChange: FellChangeHandler = null
): boolean => {
  const [objectIsFell, setObjectIsFell] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const unsubscribe = ref.current.api.rotation.subscribe(([x, y, z]) => {
        x = Math.abs(Number(x.toFixed(1)))
        y = Math.abs(Number(y.toFixed(1)))
        z = Math.abs(Number(z.toFixed(1)))
        const maxAngle = Math.max(x, y, z)
        const isFell = maxAngle > 0.1

        if (isFell) {
          if (!objectIsFell) {
            setObjectIsFell(true)
            if (onFellChange) onFellChange(true)
          }
        } else {
          if (objectIsFell) {
            setObjectIsFell(false)
            if (onFellChange) onFellChange(false)
          }
        }
      })

      return unsubscribe
    }
  }, [objectIsFell, onFellChange, ref])

  return objectIsFell
}

export default useObjectIsFell
