import styles from './Game.scss'
import React, { FC, Suspense } from 'react'
import GameWorld from './objects/GameWorld'
import { observer } from 'mobx-react-lite'

const Game: FC = () => {
  return (
    <div className={styles.host}>
      <Suspense fallback={null}>
        <GameWorld />
      </Suspense>

      <div className={styles.cross} />
    </div>
  )
}

export default observer(Game)
