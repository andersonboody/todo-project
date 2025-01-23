import { useContext } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import { enUS } from 'date-fns/locale'

import './Task.css'
import { TimerContext } from '../AppContext/AppContext.jsx'

const Task = (props) => {
  const {
    id,
    label,
    createDate,
    completedTask,
    deleteTask,
    onEditTask,
    timer: { min, sec },
  } = props

  const { timers, startTimer, stopTimer } = useContext(TimerContext)
  const timer = timers?.timers?.[id] ?? { min: min, sec: sec }
  const formattedTime = format(new Date(0, 0, 0, 0, timer.min, timer.sec), 'mm:ss')

  return (
    <div className="view">
      <input type="checkbox" className="toggle" onClick={completedTask} />
      <label>
        <span className="description">{label}</span>
        <span className="description timer">
          {formattedTime}
          <button className="icon icon-play" onClick={() => startTimer(id, min, sec)}></button>
          <button className="icon icon-pause" onClick={() => stopTimer(id)}></button>
        </span>
        <span className="created">
          {`created ${formatDistanceToNow(createDate, { includeSeconds: true, locale: enUS, addSuffix: true })}`}
        </span>
      </label>
      <button className="icon icon-edit" onClick={onEditTask}></button>
      <button className="icon icon-destroy" onClick={deleteTask}></button>
    </div>
  )
}
export default Task
