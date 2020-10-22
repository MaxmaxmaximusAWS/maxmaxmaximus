import * as THREE from 'three'
import { useSphere } from 'use-cannon'
import { getBoundingSphere, getPosition, getRotation } from './helpers'
import { SphereProps } from 'use-cannon/src/hooks'
import PhysicalObject from './PhysicalObject'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FCR,
  useImperativeHandle,
} from 'react'

type PhysicalSphereProps = JSX.IntrinsicElements['mesh'] & {
  mesh: THREE.Mesh
  physics?: SphereProps
}

const PhysicalSphere: FCR<PhysicalObject, PhysicalSphereProps> = (
  props,
  ref
) => {
  const { mesh, physics = {}, ...otherProps } = props

  const [meshRef, api] = useSphere(() => {
    return {
      ...physics,
      args: physics.args ?? getBoundingSphere(mesh),
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

export default forwardRef(PhysicalSphere)
