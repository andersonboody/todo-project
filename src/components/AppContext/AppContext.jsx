import { useState, createContext, useRef, useEffect } from 'react'
import debounce from 'lodash.debounce'

const TimerContext = createContext()
const { Provider, Consumer } = TimerContext

const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState({})
  const timersRef = useRef(timers)

  useEffect(() => {
    timersRef.current = timers
  }, [timers])

  const createStateTimer = (taskId, initialMin, initialSec) => {
    setTimers((prevState) => ({
      ...prevState,
      timers: {
        ...prevState.timers,
        [taskId]: {
          min: initialMin,
          sec: initialSec,
          timerActive: false,
          intervalId: null,
        },
      },
    }))
  }

  const startTimer = (taskId, initialMin, initialSec) => {
    if (!timersRef?.current?.timers?.[taskId]) {
      createStateTimer(taskId, initialMin, initialSec)
    }
    if (!timersRef?.current?.timers?.[taskId]?.timerActive) {
      debounceTimer(taskId)
    }
  }

  const debounceTimer = debounce((taskId) => {
    const intervalId = setInterval(() => {
      const timer = { ...timersRef.current.timers[taskId] }
      if (timer.min <= 0 && timer.sec <= 0) {
        clearInterval(intervalId)
        setTimers((prevState) => ({
          ...prevState,
          timers: {
            ...prevState.timers,
            [taskId]: {
              ...prevState.timers[taskId],
              timerActive: false,
              intervalId: null,
            },
          },
        }))
        return
      }
      if (timer.sec === 0) {
        setTimers((prevState) => ({
          ...prevState,
          timers: {
            ...prevState.timers,
            [taskId]: {
              min: timer.min - 1,
              sec: 59,
              timerActive: true,
              intervalId: intervalId,
            },
          },
        }))
        return
      }
      setTimers((prevState) => ({
        ...prevState,
        timers: {
          ...prevState.timers,
          [taskId]: {
            ...timer,
            sec: timer.sec - 1,
            timerActive: true,
            intervalId: intervalId,
          },
        },
      }))
    }, 1000)
  }, 300)

  const stopTimer = (taskId) => {
    if (timersRef.current.timers && timersRef.current.timers[taskId]) {
      clearInterval(timersRef.current.timers[taskId].intervalId)
      setTimers((prevState) => ({
        ...prevState,
        timers: {
          ...prevState.timers,
          [taskId]: { ...prevState.timers[taskId], timerActive: false },
        },
      }))
    }
  }

  const value = {
    timers,
    startTimer,
    stopTimer,
  }

  return <Provider value={value}>{children}</Provider>
}

export { TimerProvider, Consumer as TimerConsumer, TimerContext }
