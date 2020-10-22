import React, { FC, RefObject } from 'react'
import useKeyDown from '../../../hooks/useKeyDown'
import PhysicalObject from '../../../lib/PhysicalObject'
import usePointerLockControls from '../../../hooks/usePointerLockControls'
import usePlayerHoldingBall from '../../../hooks/usePlayerHoldingBall'

export interface PlayerProps {
  ball: RefObject<PhysicalObject>
}

const Player: FC<PlayerProps> = ({ ball }) => {
  const isRunning = useKeyDown('ShiftLeft')

  const playerControls = usePointerLockControls({
    speed: isRunning ? 60 : 30,
    height: 1,
    x: 0,
    z: 0,
  })

  usePlayerHoldingBall({
    playerControls,
    ball,
    force: 50,
    holdingDistance: 0.6,
  })

  return null
}

export default Player
