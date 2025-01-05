import React, { Component } from 'react'

import './App.css'
import AppHeader from '../AppHeader/AppHeader'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {
  newId = 0
  createTodoItem(label) {
    return {
      label,
      completed: false,
      id: this.newId++,
      createDate: new Date(),
      timer: 0,
    }
  }

  constructor() {
    super()
    this.state = {
      todoData: [],
      filter: 'all',
    }
    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.filter((elem) => elem.id !== id)
        return {
          todoData: newTodoData,
        }
      })
    }
    this.completedItem = (id) => {
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
    this.deleteAll = () => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.filter((elem) => !elem.completed)
        return {
          todoData: newTodoData,
        }
      })
    }
    this.newAddTask = (label) => {
      const newTask = this.createTodoItem(label)
      this.setState(({ todoData }) => {
        const newArr = [...todoData, newTask]
        return {
          todoData: newArr,
        }
      })
    }
    this.FilterTask = (filter) => {
      this.setState({
        filter,
      })
    }
    this.editTask = (id, newLabel) => {
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
  }

  render() {
    const { todoData, filter } = this.state

    const countUnfinishedTask = todoData.filter((elem) => !elem.completed).length
    const filterTask = todoData.filter((elem) => {
      switch (filter) {
        case 'active':
          return !elem.completed
        case 'completed':
          return elem.completed
        default:
          return true
      }
    })

    return (
      <section className="todoApp">
        <AppHeader onAddTask={this.newAddTask} />
        <TaskList
          todos={filterTask}
          onDeleted={this.deleteItem}
          onCompleted={this.completedItem}
          onEditTask={this.editTask}
        />
        <Footer
          onDeletedAll={this.deleteAll}
          countTasks={countUnfinishedTask}
          filter={filter}
          onFilterTask={this.FilterTask}
        />
      </section>
    )
  }
}
