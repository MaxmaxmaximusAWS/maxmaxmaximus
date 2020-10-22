import React, { FC } from 'react'
import Box from '../../../lib/PhysicalBox'
import useGLTFNode from '../../../hooks/useGLTFNode'
import * as THREE from 'three'
import sceneUrl from '../../../blender/export/scene.glb'

const Room: FC = () => {
  const ceilingMesh = useGLTFNode<THREE.Mesh>(sceneUrl, 'ceiling')
  const floorMesh = useGLTFNode<THREE.Mesh>(sceneUrl, 'floor')
  const wallMesh = useGLTFNode<THREE.Mesh>(sceneUrl, 'wall')

  return (
    <>
      <Box mesh={ceilingMesh} receiveShadow={true} />
      <Box mesh={floorMesh} receiveShadow={true} />
      <Box mesh={wallMesh} receiveShadow={true} />
    </>
  )
}

export default Room
