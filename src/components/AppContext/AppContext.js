import { Component, createContext } from 'react'
import debounce from 'lodash.debounce'

const { Provider, Consumer } = createContext()

class TimerProvider extends Component {
  state = {
    timers: {},
  }

  createStateTimer = (taskId, initialMin, initialSec) => {
    if (!this.state.timers[taskId]) {
      this.setState((prevState) => ({
        timers: {
          ...prevState.timers,
          [taskId]: {
            min: parseInt(initialMin),
            sec: parseInt(initialSec),
            timerActive: false,
            intervalId: null,
          },
        },
      }))
    }
  }

  startTimer = (taskId, initialMin, initialSec) => {
    this.debounceTimer(taskId, initialMin, initialSec)
  }

  debounceTimer = debounce((taskId, initialMin, initialSec) => {
    this.createStateTimer(taskId, initialMin, initialSec)

    const timerExists = this.state.timers[taskId]
    if (timerExists && timerExists.timerActive) {
      return
    }
    this.setState((prevState) => ({
      timers: {
        ...prevState.timers,
        [taskId]: {
          ...prevState.timers[taskId],
          timerActive: true,
        },
      },
    }))

    const intervalId = setInterval(() => {
      this.setState((prevState) => {
        const timer = { ...prevState.timers[taskId] }
        if (timer.min <= 0 && timer.sec <= 0) {
          clearInterval(intervalId)
          return {
            timers: {
              ...prevState.timers,
              [taskId]: {
                ...prevState.timers[taskId],
                timerActive: false,
                intervalId: null,
              },
            },
          }
        }
        if (timer.sec === 0) {
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
  }, 300)

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
