import React, { Component } from 'react'
import './Task.css'
import { formatDistanceToNow, format, addSeconds } from 'date-fns'
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
  constructor(props) {
    super(props)

    this.state = {
      seconds: this.props.timer,
      timerActive: false,
    }
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
          return {
            seconds: prevState.seconds + 1,
          }
        })
      }, 1000)
    }
  }
  stopTimer = () => {
    if (this.state.timerActive) {
      clearInterval(this.intervalId)
      this.setState({ timerActive: false })
    }
  }

  render() {
    const { label, createDate, onCompleted, onDeleted, onEditTask } = this.props
    const formattedTime = format(addSeconds(new Date(0), this.state.seconds), 'mm:ss')
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
