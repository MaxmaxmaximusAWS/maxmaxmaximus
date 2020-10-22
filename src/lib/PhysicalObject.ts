import * as THREE from 'three'
import { Api } from 'use-cannon/src/hooks'

interface IPhysicalObject {
  mesh: THREE.Mesh
  api: Api['1']
}

export default class PhysicalObject implements IPhysicalObject {
  public mesh: THREE.Mesh
  public api: Api['1']

  constructor(params: IPhysicalObject) {
    this.mesh = params.mesh
    this.api = params.api
  }
}
