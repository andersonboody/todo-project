import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  newAddTask = (e) => {
    const { name, value } = e.target
    if (name === 'label' && value === ' ') {
      return alert('Первый символ не должен быть пробелом!')
    }
    if ((name === 'min' || name === 'sec') && (value >= 60 || isNaN(value))) {
      return alert('Пожалуйста, введите корректное число!')
    }
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmitForm = (e) => {
    e.preventDefault()
    this.props.onAddTask(this.state.label, this.state.min, this.state.sec)
    this.setState({ label: '', min: '', sec: '' })
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.onSubmitForm}>
        <input
          type="text"
          name="label"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.newAddTask}
          value={label}
          autoFocus
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="min"
          onChange={this.newAddTask}
          value={min}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="sec"
          onChange={this.newAddTask}
          value={sec}
          required
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    )
  }
}
