import * as THREE from 'three'
import { useCylinder } from 'use-cannon'
import { getPosition, getRotation } from './helpers'
import { CylinderProps } from 'use-cannon/src/hooks'
import PhysicalObject from './PhysicalObject'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FRRF,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react'

type PhysicalCylinderProps = JSX.IntrinsicElements['mesh'] & {
  mesh: THREE.Mesh
  physics?: CylinderProps
  resetPosition?: boolean
}

type StartedPosition = [number, number, number]
type StartedRotation = [number, number, number]

const PhysicalCylinder: FRRF<PhysicalObject, PhysicalCylinderProps> = (
  props,
  ref
) => {
  const { mesh, resetPosition, physics = {}, ...otherProps } = props

  // @ts-ignore
  const startedPosition = useMemo<StartedPosition>(() => {
    return physics.position ?? getPosition(mesh)
  }, [mesh, physics.position])

  const startedRotation = useMemo<CylinderProps['rotation']>(() => {
    return physics.rotation ?? getRotation(mesh)
  }, [mesh, physics.rotation])

  const [meshRef, api] = useCylinder(() => {
    return {
      ...physics,
      args: physics.args ?? [0.5, 0.5, 1, 20],
      position: startedPosition,
      rotation: startedRotation,
    }
  })

  useEffect(() => {
    if (resetPosition) {
      // startedPosition[3]
      api.position.set(1, 2, 3)
    }
  }, [api.position, resetPosition])

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

export default forwardRef(PhysicalCylinder)
