import React, { FC } from 'react'

const Lights: FC = () => {
  const bias = -0.0002
  const resolution = 1024 * 4
  const angle = 0.9

  return (
    <>
      <spotLight
        position={[-10, 2, -3]}
        angle={angle}
        penumbra={1}
        intensity={2}
        castShadow={true}
        shadow-bias={bias}
        shadow-mapSize-width={resolution}
        shadow-mapSize-height={resolution}
      />

      <spotLight
        position={[3, 3, 3]}
        angle={angle}
        penumbra={1}
        intensity={2}
        castShadow={true}
        shadow-bias={bias}
        shadow-mapSize-width={resolution}
        shadow-mapSize-height={resolution}
      />

      <hemisphereLight intensity={0.3} />
      <pointLight position={[-30, 10, -30]} intensity={0.5} />
    </>
  )
}

export default Lights
