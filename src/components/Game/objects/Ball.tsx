import useGLTFNode from '../../../hooks/useGLTFNode'
import sceneUrl from '../../../blender/export/scene.glb'
import PhysicalSphere from '../../../lib/PhysicalSphere'
import PhysicalObject from '../../../lib/PhysicalObject'
import { useThree } from 'react-three-fiber'
import * as THREE from 'three'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FRRF,
  useEffect,
} from 'react'

const POUND_TO_KG = 0.453592

interface BallProps {
  num?: number
}

const Ball: FRRF<PhysicalObject, BallProps> = ({ num = 10 }, ball) => {
  const mesh = useGLTFNode<THREE.Mesh>(sceneUrl, 'ball')
  const three = useThree()

  useEffect(() => {
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
    })

    const cubeCamera = new THREE.CubeCamera(0.2, 100, cubeRenderTarget)
    three.scene.add(cubeCamera)

    const material = mesh.material as THREE.MeshStandardMaterial
    material.envMap = cubeRenderTarget.texture

    // @ts-ignore
    cubeCamera.position.copy(ball.current.mesh.position)
    cubeCamera.update(three.gl, three.scene)
  }, [three, mesh])

  return (
    <PhysicalSphere
      ref={ball}
      mesh={mesh}
      castShadow={true}
      receiveShadow={true}
      physics={{
        mass: num * POUND_TO_KG,
        position: [0, 1, -1],
        allowSleep: false,
      }}
    ></PhysicalSphere>
  )
}

export default forwardRef(Ball)
