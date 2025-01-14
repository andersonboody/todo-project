import React, { Component } from 'react'

import './App.css'
import { TimerProvider } from '../AppContext/AppContext'
import AppHeader from '../AppHeader/AppHeader'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {
  newId = 0

  state = {
    todoData: [],
    filter: 'all',
  }

  createTask = (label, min, sec) => {
    const newTask = {
      id: this.newId++,
      label,
      completed: false,
      createDate: new Date(),
      timer: { min: min, sec: sec },
      // min,
      // sec,
    }
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask]
      return {
        todoData: newArr,
      }
    })
  }

  completedItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((elem) => {
        if (elem.id === id) {
          return { ...elem, completed: !elem.completed }
        }
        return elem
      })
      return {
        todoData: newTodoData,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((elem) => elem.id !== id)
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

    const countUnfinishedTask = todoData.filter((elem) => !elem.completed).length
    const todoDataFilter = todoData.filter((elem) => {
      if (filter === 'active') {
        return !elem.completed
      } else if (filter === 'completed') {
        return elem.completed
      } else {
        return elem
      }
    })

    return (
      <section className="todoApp">
        <TimerProvider>
          <AppHeader onCreateTask={this.createTask} />
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
        </TimerProvider>
      </section>
    )
  }
}
