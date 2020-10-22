import styles from './Game.scss'
import React, { FC, Suspense } from 'react'
import GameWorld from './objects/GameWorld'
import GameController from '../../controllers/GameController'
import { observer } from 'mobx-react-lite'

const Game: FC = () => {
  const { status } = GameController

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
