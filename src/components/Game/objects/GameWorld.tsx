import React, { FC, useEffect, useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics } from 'use-cannon'
import Lights from './Lights'
import Player from './Player'
import Ball from './Ball'
import useGLTFNode from '../../../hooks/useGLTFNode'
import sceneUrl from '../../../blender/export/scene.glb'
import { Sky } from '@react-three/drei'
import PhysicalObject from '../../../lib/PhysicalObject'
import Room from './Room'
import Pins from './Pins'

// preload assets
useGLTFNode.preload(sceneUrl)

const GameWorld: FC = () => {
  const ball = useRef<PhysicalObject>(null)

  return (
    <Canvas concurrent shadowMap>
      <Lights />
      <Sky />

      <Physics iterations={10} allowSleep={true}>
        <Ball ref={ball} />
        <Player ball={ball} />
        <Room />
        <Pins />
      </Physics>
    </Canvas>
  )
}

export default GameWorld

const colors = ['#99b898', '#fecea8', '#ff847c', '#e84a5f', '#2a363b']
