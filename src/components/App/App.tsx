import styles from './App.scss'
import React, { FC } from 'react'
import { Message } from '../../store/chat/types'
import useStore from '../../hooks/useStore'
import Game from '../Game/Game'

interface Selected {
  messages: Message[]
}

const App: FC = () => {
  const { messages } = useStore<Selected>((state) => ({
    messages: state.chat.messages,
  }))

  return (
    <div className={styles.host}>
      <Game />
    </div>
  )
}

export default App
