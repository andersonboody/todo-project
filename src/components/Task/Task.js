import React, { Component } from 'react'
import './Task.css'
import { formatDistanceToNow, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import propTypes from 'prop-types'

export default class Task extends Component {
  static propTypes = {
    label: propTypes.string,
    createDate: propTypes.object,
    onCompleted: propTypes.func,
    onDeleted: propTypes.func,
    onEditTask: propTypes.func,
    timer: propTypes.number,
  }
  static defaultProps = {
    label: '',
    createDate: new Date(),
    onCompleted: () => {},
    onDeleted: () => {},
    onEditTask: () => {},
  }

  render() {
    const {
      id,
      label,
      completed,
      createDate,
      timer: { min, sec },
      onCompleted,
      onDeleted,
      onEditTask,
      startTimer,
      stopTimer,
      timers,
    } = this.props
    const timer = timers[id] || { min: min, sec: sec }
    const formattedTime = format(new Date(0, 0, 0, 0, timer.min, timer.sec), 'mm:ss')
    return (
      <div className="view">
        <input type="checkbox" className="toggle" onChange={onCompleted} checked={completed} />
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
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}
