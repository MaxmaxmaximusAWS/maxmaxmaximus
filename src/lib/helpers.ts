import * as THREE from 'three'

type Vector3Array = [number, number, number]
const BLENDER_SCALE_FACTOR = 2

export const getBoundingBox = (mesh: THREE.Mesh): Vector3Array => {
  const boundingBox = mesh.geometry.boundingBox

  if (!boundingBox) {
    return [0, 0, 0]
  }

  const box = boundingBox.max
  const scale = mesh.scale

  const x = box.x * scale.x * BLENDER_SCALE_FACTOR
  const y = box.y * scale.y * BLENDER_SCALE_FACTOR
  const z = box.z * scale.z * BLENDER_SCALE_FACTOR

  // console.log('mesh', mesh)
  // console.log('scaled', [x, y, z])
  // console.log('===============================')

  return [x, y, z]
}

export const getBoundingSphere = (mesh: THREE.Mesh): number => {
  const [x, y, z] = getBoundingBox(mesh)
  return Math.max(x, y, z) / BLENDER_SCALE_FACTOR
}

export const getPosition = (mesh: THREE.Mesh): Vector3Array => {
  return vector3ToVector3Array(mesh.position)
}

export const getRotation = (mesh: THREE.Mesh): Vector3Array => {
  return vector3ToVector3Array(mesh.rotation)
}

export const vector3ToVector3Array = (vector3): Vector3Array => {
  const { x, y, z } = vector3
  return [x, y, z]
}
