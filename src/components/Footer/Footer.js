import React, { Component } from 'react'
import './Footer.css'
import propTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

export default class Footer extends Component {
  static propTypes = {
    countTasks: propTypes.number,
    filter: propTypes.func,
    onFilterTask: propTypes.func,
    onDeletedAll: propTypes.func,
  }
  static defaultProps = {
    countTasks: 0,
    filter: () => {},
    onFilterTask: () => {},
    onDeletedAll: () => {},
  }

  render() {
    const { countTasks, filter, onFilterTask, onDeletedAll } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{countTasks} items left</span>
        <TasksFilter filter={filter} onFilterTask={onFilterTask} />
        <button className="clear-completed" onClick={onDeletedAll}>
          Clear completed
        </button>
      </footer>
    )
  }
}
