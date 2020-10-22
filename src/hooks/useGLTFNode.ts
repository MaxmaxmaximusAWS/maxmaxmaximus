import { useGLTF } from '@react-three/drei/useGLTF'
import * as THREE from 'three'

const useGLTFNode = <T = THREE.Object3D>(url: string, name: string): T => {
  const gltf = useGLTF(url)
  const nodes = gltf['nodes']
  if (!nodes[name]) {
    throw new Error(`Cant load node "${name}"`)
  }
  return nodes[name] as T
}

useGLTFNode.preload = useGLTF.preload

export default useGLTFNode
