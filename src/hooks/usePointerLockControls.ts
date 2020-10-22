import { useFrame, useThree } from 'react-three-fiber'
import { useEffect, useMemo, useState } from 'react'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import * as THREE from 'three'
import useKeyDown from './useKeyDown'

interface PointerLockControlsOptions {
  height?: number
  speed?: number
  x?: number
  z?: number
}

const usePointerLockControls = (
  options: PointerLockControlsOptions
): PointerLockControls | undefined => {
  const { height = 1, speed = 30, x = 0, z = 0 } = options

  const three = useThree()
  const moveForward = useKeyDown('KeyW')
  const moveBackward = useKeyDown('KeyS')
  const moveLeft = useKeyDown('KeyA')
  const moveRight = useKeyDown('KeyD')
  const [controls, setControls] = useState<PointerLockControls>()

  useEffect(() => {
    three.camera.position.set(x, height, z)
  }, [three.camera, x, z, height])

  useEffect(() => {
    const camera = three.camera
    const domElement = three.gl.domElement
    const controls = new PointerLockControls(camera, domElement)

    setControls(controls)

    const onClick = () => {
      controls.lock()
    }

    domElement.addEventListener('click', onClick)

    return () => {
      domElement.removeEventListener('click', onClick)
    }
  }, [three.camera, three.gl.domElement])

  // imperative state
  const state = useMemo(
    () => ({
      prevTime: performance.now(),
      velocity: new THREE.Vector3(),
      direction: new THREE.Vector3(),
    }),
    []
  )

  // movie
  useFrame(() => {
    if (!controls) return

    const time = performance.now()
    const delta = (time - state.prevTime) / 1000
    const camera = controls.getObject()

    state.velocity.x -= state.velocity.x * 10 * delta
    state.velocity.z -= state.velocity.z * 10 * delta
    state.velocity.y -= 9.8 * 100 * delta // 100 = mass

    state.direction.z = Number(moveForward) - Number(moveBackward)
    state.direction.x = Number(moveRight) - Number(moveLeft)
    state.direction.normalize() // this ensures consistent movements in all directions

    if (moveForward || moveBackward)
      state.velocity.z -= state.direction.z * speed * delta
    if (moveLeft || moveRight)
      state.velocity.x -= state.direction.x * speed * delta

    controls.moveRight(-state.velocity.x * delta)
    controls.moveForward(-state.velocity.z * delta)

    if (camera.position.y < height) {
      state.velocity.y = 0
      camera.position.y = height
    }

    state.prevTime = time
  })

  return controls
}

export default usePointerLockControls
