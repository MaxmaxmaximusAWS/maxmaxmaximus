import React, { FC, useRef } from 'react'
import PhysicalObject from '../../../lib/PhysicalObject'
import sceneUrl from '../../../blender/export/scene.glb'
import useGLTFNode from '../../../hooks/useGLTFNode'
import PhysicalCylinder from '../../../lib/PhysicalCylinder'
import * as THREE from 'three'
import { CylinderProps } from 'use-cannon'
import useObjectIsFell, {
  FellChangeHandler,
} from '../../../hooks/useObjectIsFell'

export interface PinProps {
  position: [number, number, number]
  resetPin?: boolean
  onFellChange?: FellChangeHandler
}

const Pin: FC<PinProps> = ({
  position,
  resetPin = false,
  onFellChange = null,
}) => {
  const pin = useRef<PhysicalObject>(null)
  const mesh = useGLTFNode<THREE.Mesh>(sceneUrl, 'pin')
  const cylinderArgs: CylinderProps['args'] = [0.02, 0.1, 0.4, 10]

  useObjectIsFell(pin, onFellChange)

  return (
    <PhysicalCylinder
      ref={pin}
      mesh={mesh}
      castShadow
      receiveShadow
      resetPosition={resetPin}
      physics={{
        mass: 0.2,
        allowSleep: true,
        args: cylinderArgs,
        position: position,
        sleepSpeedLimit: 1,
        sleepTimeLimit: 1,
      }}
    />
  )
}

export default Pin
