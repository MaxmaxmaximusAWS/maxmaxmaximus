import { RefObject, useMemo, useState } from 'react'
import * as THREE from 'three'
import useKeyDown from './useKeyDown'
import { useFrame, useThree } from 'react-three-fiber'
import usePointerDown from './usePointerDown'
import PhysicalObject from '../lib/PhysicalObject'

interface PlayerHoldingBallOptions {
  playerControls
  ball: RefObject<PhysicalObject>
  force?: number
  holdingDistance?: number
}

const usePlayerHoldingBall = (options: PlayerHoldingBallOptions) => {
  const { playerControls, ball, force = 50, holdingDistance = 1 } = options
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const [holding, setHolding] = useState(false)
  const three = useThree()

  // start holding
  useKeyDown('KeyE', () => {
    if (holding) {
      setHolding(false)
      return
    }

    if (!ball.current) {
      setHolding(false)
      return
    }

    const { mesh } = ball.current
    raycaster.setFromCamera(new THREE.Vector2(), three.camera)
    const intersects = raycaster.intersectObject(mesh)
    const hasIntersects = Boolean(intersects.length)

    if (hasIntersects) {
      setHolding(true)
    } else {
      setHolding(false)
    }
  })

  // throwing
  usePointerDown(() => {
    if (!holding) return
    if (!ball.current) return
    if (!playerControls) return

    const { api } = ball.current
    const camera = playerControls.getObject()
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.multiplyScalar(force)

    api.applyLocalImpulse(
      [cameraDirection.x, cameraDirection.y, cameraDirection.z],
      [0, 0, 0]
    )

    setHolding(false)
  })

  // holding and move every frame
  useFrame(() => {
    if (!holding) return
    if (!playerControls) return
    if (!ball.current) return

    const { api } = ball.current
    const camera = playerControls.getObject()
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.multiplyScalar(holdingDistance)

    api.position.set(
      camera.position.x + cameraDirection.x,
      camera.position.y + cameraDirection.y,
      camera.position.z + cameraDirection.z
    )

    api.rotation.set(0, 0, 0)
    api.velocity.set(0, 0, 0)
    api.angularVelocity.set(0, 0, 0)
  })

  return holding
}

export default usePlayerHoldingBall
