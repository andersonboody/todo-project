import { Component, createContext } from 'react'

const { Provider, Consumer } = createContext()

class TimerProvider extends Component {
  state = {
    timers: {},
  }

  startTimer = (taskId, initialMin, initialSec) => {
    if (!this.state.timers[taskId]) {
      this.setState((prevState) => ({
        timers: {
          ...prevState.timers,
          [taskId]: {
            min: initialMin,
            sec: initialSec,
            timerActive: true,
            intervalId: null,
          },
        },
      }))
    }
    const intervalId = setInterval(() => {
      this.setState((prevState) => {
        const timer = { ...prevState.timers[taskId] }
        if (timer.min <= 0 && timer.sec <= 0) {
          clearInterval(intervalId)
          return {
            timer: {
              ...prevState.timers,
              [taskId]: {
                min: initialMin,
                sec: initialSec,
                timerActive: true,
                intervalId: null,
              },
            },
          }
        }
        if (prevState.sec === 0) {
          return {
            timers: {
              ...prevState.timers,
              [taskId]: {
                min: timer.min - 1,
                sec: 59,
                timerActive: true,
                intervalId: null,
              },
            },
          }
        }
        return {
          timers: {
            ...prevState.timers,
            [taskId]: { ...timer, sec: timer.sec - 1, timerActive: true, intervalId: intervalId },
          },
        }
      })
    }, 1000)
  }

  stopTimer = (taskId) => {
    if (this.state.timers[taskId]) {
      clearInterval(this.state.timers[taskId].intervalId)
      this.setState((prevState) => ({
        timers: {
          ...prevState.timers,
          [taskId]: { ...prevState.timers[taskId], timerActive: false },
        },
      }))
    }
  }
  render() {
    return (
      <Provider value={{ startTimer: this.startTimer, stopTimer: this.stopTimer, timers: this.state.timers }}>
        {this.props.children}
      </Provider>
    )
  }
}

export { TimerProvider, Consumer as TimerConsumer }
