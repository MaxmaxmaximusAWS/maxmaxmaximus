import React, { FC, useCallback, useState } from 'react'
import { PinProps } from './Pin'
import IndexedPin, { IndexedPinFellChangeHandler } from './IndexedPin'

export interface PinsProps {
  resetPins?: boolean
}

const Pins: FC<PinsProps> = ({ resetPins = false }) => {
  const y = 0.5
  const offsetZ = 7
  const distance = 0.3

  const [pinsStates, setPinsStates] = useState<PinProps[]>(() => [
    { position: [distance * 0, y, -distance * 0 - offsetZ] },
    { position: [distance * -0.5, y, -distance - offsetZ] },
    { position: [distance * 0.5, y, -distance - offsetZ] },
    { position: [distance * -1, y, -distance * 2 - offsetZ] },
    { position: [distance * 0, y, -distance * 2 - offsetZ] },
    { position: [distance * 1, y, -distance * 2 - offsetZ] },
    { position: [distance * -1.5, y, -distance * 3 - offsetZ] },
    { position: [distance * -0.5, y, -distance * 3 - offsetZ] },
    { position: [distance * 0.5, y, -distance * 3 - offsetZ] },
    { position: [distance * 1.5, y, -distance * 3 - offsetZ] },
  ])

  const onFellChange = useCallback<IndexedPinFellChangeHandler>(
    (isFell, index) => {
      // console.log('onFellChange', isFell, index)
    },
    []
  )

  return (
    <>
      {pinsStates.map((pinsState, index) => (
        <IndexedPin
          key={index}
          index={index}
          {...pinsState}
          resetPin={resetPins}
          onFellChange={onFellChange}
        />
      ))}
    </>
  )
}

export default Pins
