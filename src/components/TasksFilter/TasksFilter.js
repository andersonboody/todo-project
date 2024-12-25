import React, { Component } from 'react'
import './TasksFilter.css'
import propTypes from 'prop-types'

export default class TasksFilter extends Component {
  static propTypes = {
    filter: propTypes.func,
    onFilterTask: propTypes.func,
  }
  static defaultProps = {
    filter: () => {},
    onFilterTask: () => {},
  }

  render() {
    const { filter, onFilterTask } = this.props
    return (
      <ul className="filters">
        <li>
          <button className={filter === 'all' ? 'selected' : null} onClick={() => onFilterTask('all')}>
            All
          </button>
        </li>
        <li>
          <button className={filter === 'active' ? 'selected' : null} onClick={() => onFilterTask('active')}>
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'completed' ? 'selected' : null} onClick={() => onFilterTask('completed')}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
