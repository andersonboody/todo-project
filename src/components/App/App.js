import React, { Component } from 'react'

import './App.css'
import AppHeader from '../AppHeader/AppHeader'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {
  newId = 0

  state = {
    todoData: [],
    filter: 'all',
  }

  createTodoItem(label, min, sec) {
    return {
      label,
      min,
      sec,
      completed: 'active',
      id: this.newId++,
      createDate: new Date(),
      show: 'list-item',
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((elem) => elem.id !== id)
      return {
        todoData: newTodoData,
      }
    })
  }

  completedItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((elem) => {
        if (elem.id === id) {
          if (elem.completed === 'active') {
            return { ...elem, completed: 'completed' }
          }
          return { ...elem, completed: 'active' }
        }
        return elem
      })
      return {
        todoData: newTodoData,
      }
    })
  }

  deleteAll = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((elem) => elem.completed === 'active')
      return {
        todoData: newTodoData,
      }
    })
  }

  newAddTask = (label, min, sec) => {
    const newTask = this.createTodoItem(label, min, sec)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask]
      return {
        todoData: newArr,
      }
    })
  }

  editTask = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((elem) => {
        if (elem.id === id) {
          return { ...elem, label: newLabel }
        }
        return elem
      })
      return {
        todoData: newTodoData,
      }
    })
  }
  filterTask = (meaning) => {
    this.setState({ filter: meaning })
  }

  render() {
    const { todoData, filter } = this.state

    const countUnfinishedTask = todoData.filter((elem) => elem.completed === 'active').length
    const todoDataFilter = todoData.map((elem) => {
      if (filter === 'all') {
        return { ...elem, show: 'list-item' }
      } else if (filter === 'active' && elem.completed === 'active') {
        return { ...elem, show: 'list-item' }
      } else if (filter === 'completed' && elem.completed === 'completed') {
        return { ...elem, show: 'list-item' }
      } else {
        return { ...elem, show: 'hidden' }
      }
    })

    return (
      <section className="todoApp">
        <AppHeader onAddTask={this.newAddTask} />
        <TaskList
          todos={todoDataFilter}
          onDeleted={this.deleteItem}
          onCompleted={this.completedItem}
          onEditTask={this.editTask}
        />
        <Footer
          onDeletedAll={this.deleteAll}
          countTasks={countUnfinishedTask}
          filter={filter}
          onFilterTask={this.filterTask}
        />
      </section>
    )
  }
}
