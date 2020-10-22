import { makeAutoObservable } from 'mobx'

class GameController {
  status: 'started' | 'ended'

  constructor() {
    this.status = 'started'
    makeAutoObservable(this)
    //
    // setInterval(() => {
    //   if (this.status === 'started') {
    //     this.setStatus('ended')
    //   } else {
    //     this.setStatus('started')
    //   }
    // }, 1000)
  }

  setStatus = (status) => {
    this.status = status
  }
}

export default new GameController()
