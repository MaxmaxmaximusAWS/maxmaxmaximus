import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import GlobalSettingsController from '../../scripts/controllers/GameSettings'
import { PositionalAudio } from '@react-three/drei'

type PhysicalAudioProps = JSX.IntrinsicElements['positionalAudio'] & {
  url: string
  distance?: number
  loop?: boolean
}

const PhysicalAudio: FC<PhysicalAudioProps> = (props) => {
  const { soundsEnabled } = GlobalSettingsController

  if (!soundsEnabled) {
    return null
  }

  return <PositionalAudio {...props} />
}

export default observer(PhysicalAudio)
