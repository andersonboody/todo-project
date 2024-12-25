import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import "./AppHeader.css"
import propTypes from "prop-types";

export default class AppHeader extends Component {
  
  static propTypes = {
    onAddTask: propTypes.func
  }
  static defaultProps = {
    onAddTask: () => {}
  }

  render() {
    return (
      <header>
        <h1>todos</h1>
        <NewTaskForm onAddTask={this.props.onAddTask}/>
      </header>
    )    
  }
}
