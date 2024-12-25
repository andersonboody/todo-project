import React, { Component } from "react";
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  
  constructor() {
    super()

    this.state = {
      label: ''
    }
    this.newAddTask = (e) => {
      this.setState({
        label: e.target.value
      })
    }
    this.onSubmit = (e) => {
      e.preventDefault()
      this.props.onAddTask(this.state.label)
      this.setState({
        label: ''
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input 
          className='new-todo'
          placeholder="What needs to be done?"
          onChange={this.newAddTask}
          value={this.state.label}
          autoFocus/>
      </form>
    )
  }
}
