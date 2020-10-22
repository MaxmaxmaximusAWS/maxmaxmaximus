import styles from './App.scss'
import React, { FC } from 'react'
import Game from '../Game/Game'

const App: FC = () => {
  return <div className={styles.host}>{<Game />}</div>
}

export default App
