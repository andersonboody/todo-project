import React, { Component, createRef } from 'react'
import './TaskList.css'
import propTypes from 'prop-types'

import Task from '../Task/Task'

export default class TaskList extends Component {
  static propTypes = {
    todos: propTypes.array,
    onDeleted: propTypes.func,
    onCompleted: propTypes.func,
    onEditTask: propTypes.func,
    id: propTypes.number,
    label: propTypes.string,
    createDate: propTypes.object,
    completed: propTypes.bool,
  }
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onCompleted: () => {},
    onEditTask: () => {},
    id: 0,
    label: '',
    createDate: {},
    completed: false,
  }

  constructor() {
    super()
    this.state = {
      editTaskId: null,
      editLabel: '',
    }

    this.textInput = createRef()

    this.startEditingTask = (id, label) => {
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
    this.editingLabel = (e) => {
      this.setState({
        editLabel: e.target.value,
      })
    }
    this.saveEditing = (e) => {
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
  }
  focusTextInput() {
    this.textInput.current.focus()
  }

  render() {
    const { todos, onDeleted, onCompleted } = this.props
    const { editTaskId, editLabel } = this.state

    const elements = todos.map((item) => {
      const { id, label, createDate, completed } = item

      let classNames = ''
      if (completed) classNames = 'completed'

      const isEdit = editTaskId === id
      return (
        <li key={id} className={classNames}>
          {isEdit ? (
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
              label={label}
              createDate={createDate}
              onDeleted={() => onDeleted(id)}
              onCompleted={() => onCompleted(id)}
              onEditTask={() => this.startEditingTask(id, label)}
            />
          )}
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
