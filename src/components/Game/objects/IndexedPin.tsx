import Pin, { PinProps } from './Pin'
import React, { FC, useCallback } from 'react'

export type IndexedPinFellChangeHandler = (
  isFell: boolean,
  index: number
) => void

export interface IndexedPinProps extends Omit<PinProps, 'onFellChange'> {
  index: number // index to distinguish between pins
  onFellChange?: IndexedPinFellChangeHandler
}

const IndexedPin: FC<IndexedPinProps> = ({ index, onFellChange, ...props }) => {
  const onFellChangeCallback = useCallback(
    (isFell) => {
      if (onFellChange) onFellChange(isFell, index)
    },
    [index, onFellChange]
  )

  return <Pin {...props} onFellChange={onFellChangeCallback} />
}

export default IndexedPin
