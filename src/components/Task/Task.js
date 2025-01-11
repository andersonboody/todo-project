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

  state = {
    min: this.props.min,
    sec: this.props.sec,
    timerActive: false,
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    if (!this.state.timerActive) {
      this.setState({
        timerActive: true,
      })
      this.intervalId = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.min <= 0 && prevState.sec <= 0) {
            clearInterval(this.intervalId)
            return {
              min: 0,
              sec: 0,
            }
          }
          if (prevState.sec === 0) {
            return {
              min: prevState.min - 1,
              sec: 59,
            }
          }
          return {
            sec: prevState.sec - 1,
          }
        })
      }, 1000)
    }
  }

  stopTimer = () => {
    this.setState({ timerActive: false })
    clearInterval(this.intervalId)
  }

  render() {
    const { label, createDate, onCompleted, onDeleted, onEditTask } = this.props
    const { min, sec } = this.state
    const formattedTime = format(new Date(0, 0, 0, 0, min, sec), 'mm:ss')
    return (
      <div className="view">
        <input type="checkbox" className="toggle" onClick={onCompleted} />
        <label>
          <span className="description">{label}</span>
          <span className="description timer">
            {formattedTime}
            <button className="icon icon-play" onClick={this.startTimer}></button>
            <button className="icon icon-pause" onClick={this.stopTimer}></button>
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
