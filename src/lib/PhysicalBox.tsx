import * as THREE from 'three'
import { useBox } from 'use-cannon'
import { getBoundingBox, getPosition, getRotation } from './helpers'
import { BoxProps } from 'use-cannon/src/hooks'
import PhysicalObject from './PhysicalObject'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FRRF,
  useImperativeHandle,
} from 'react'

type PhysicalBoxProps = JSX.IntrinsicElements['mesh'] & {
  mesh: THREE.Mesh
  physics?: BoxProps
}

const PhysicalBox: FRRF<PhysicalObject, PhysicalBoxProps> = (props, ref) => {
  const { mesh, physics = {}, ...otherProps } = props

  const [meshRef, api] = useBox(() => {
    return {
      ...physics,
      args: physics.args ?? getBoundingBox(mesh),
      position: physics.position ?? getPosition(mesh),
      rotation: physics.rotation ?? getRotation(mesh),
    }
  })

  useImperativeHandle<PhysicalObject, PhysicalObject>(ref, () => {
    return new PhysicalObject({
      mesh: meshRef.current as THREE.Mesh,
      api: api,
    })
  })

  const { geometry, material, position, rotation, scale } = mesh
  const meshProps = { geometry, material, position, rotation, scale }

  return <mesh ref={meshRef} {...meshProps} {...otherProps} />
}

export default forwardRef(PhysicalBox)
