import { makeAutoObservable } from 'mobx'

class GameSettings {
  soundsEnabled = false

  constructor() {
    makeAutoObservable(this)
  }

  enableSounds = () => {
    this.soundsEnabled = true
  }

  disableSounds = () => {
    this.soundsEnabled = false
  }

  toggleSounds = () => {
    if (this.soundsEnabled) {
      this.disableSounds()
    } else {
      this.enableSounds()
    }
  }
}

export default new GameSettings()
