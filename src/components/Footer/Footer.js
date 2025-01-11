import React, { Component } from 'react'
import './Footer.css'
import propTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

export default class Footer extends Component {
  static propTypes = {
    countTasks: propTypes.number,
    onDeletedAll: propTypes.func,
    filter: propTypes.string,
    onFilterTask: propTypes.func,
  }
  static defaultProps = {
    countTasks: 0,
    onDeletedAll: () => {},
    filter: '',
    onFilterTask: () => {},
  }

  render() {
    const { countTasks, onDeletedAll, filter, onFilterTask } = this.props
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
