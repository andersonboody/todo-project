import React, { Component, createRef } from 'react'
import './TaskList.css'
import propTypes from 'prop-types'

import { TimerConsumer } from '../AppContext/AppContext'
import Task from '../Task/Task'

export default class TaskList extends Component {
  static propTypes = {
    todos: propTypes.array,
    onDeleted: propTypes.func,
    onCompleted: propTypes.func,
  }
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onCompleted: () => {},
  }

  state = {
    editTaskId: null,
    editLabel: '',
  }

  textInput = createRef()

  startEditingTask = (id, label) => {
    this.setState(
      {
        editTaskId: id,
        editLabel: label,
      },
      () => {
        this.textInput.current.focus()
      }
    )
  }
  editingLabel = (e) => {
    this.setState({
      editLabel: e.target.value,
    })
  }
  saveEditing = (e) => {
    if (e.key === 'Enter') {
      const { editTaskId, editLabel } = this.state
      if (editTaskId || editTaskId === 0) {
        this.props.onEditTask(editTaskId, editLabel)
        this.setState({
          editTaskId: null,
          editLabel: '',
        })
      }
    }
  }

  render() {
    const { todos, onDeleted, onCompleted } = this.props
    const { editTaskId, editLabel } = this.state

    const elements = todos.map((item) => {
      const { id, label, timer, createDate, completed } = item

      let classNames = ''
      if (completed) classNames = 'completed'

      const isEdit = editTaskId === id
      return (
        <li key={id} className={classNames}>
          <TimerConsumer>
            {({ startTimer, stopTimer, timers }) =>
              isEdit ? (
                <input
                  type="text"
                  className="edit"
                  value={editLabel}
                  onChange={this.editingLabel}
                  onKeyDown={this.saveEditing}
                  ref={this.textInput}
                />
              ) : (
                <Task
                  id={id}
                  label={label}
                  timer={timer}
                  // min={min}
                  // sec={sec}
                  completed={completed}
                  createDate={createDate}
                  onDeleted={() => onDeleted(id)}
                  onCompleted={() => onCompleted(id)}
                  onEditTask={() => this.startEditingTask(id, label)}
                  startTimer={startTimer}
                  stopTimer={stopTimer}
                  timers={timers}
                />
              )
            }
          </TimerConsumer>
        </li>
      )
    })

    return (
      <main className="main">
        <ul className="todo-list">{elements}</ul>
      </main>
    )
  }
}
