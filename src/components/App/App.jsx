import React, { useState } from 'react'

import './App.css'
import AppHeader from '../AppHeader/AppHeader'
import TaskList from '../TaskList/TaskList'
import AppFooter from '../AppFooter/AppFooter'

const App = () => {
  const [todos, setTodos] = useState([])
  const [id, setId] = useState(1)
  const [filter, setFilter] = useState('all')

  const createTask = (label, min, sec) => {
    const newTodo = {
      id: id,
      label,
      completed: 'active',
      createDate: new Date(),
      timer: { min: Number(min), sec: Number(sec) },
    }
    setId(id + 1)
    setTodos([...todos, newTodo])
  }
  const countCompletedTask = todos.filter((elem) => elem.completed === 'active').length
  const completedTask = (id) => {
    const newTodo = todos.map((elem) => {
      if (elem.id === id) {
        if (elem.completed === 'active') {
          return { ...elem, completed: 'completed' }
        }
        return { ...elem, completed: 'active' }
      }
      return elem
    })
    return setTodos(newTodo)
  }
  const deleteTask = (id) => {
    const newTodo = todos.filter((elem) => elem.id !== id)
    setTodos(newTodo)
  }
  const deleteCompletedTask = () => {
    const newTodo = todos.filter((elem) => elem.completed === 'active')
    setTodos(newTodo)
  }
  const filterTask = (meaning) => {
    setFilter(meaning)
  }
  const todoTaskFilter = todos.map((elem) => {
    if (filter === 'all') {
      return { ...elem, show: true }
    } else if (filter === 'active' && elem.completed === 'active') {
      return { ...elem, show: true }
    } else if (filter === 'completed' && elem.completed === 'completed') {
      return { ...elem, show: true }
    }
    return { ...elem, show: false }
  })
  const editTask = (id, newLabel) => {
    const newTodo = todos.map((elem) => {
      if (elem.id === id) {
        return { ...elem, label: newLabel }
      }
      return elem
    })
    setTodos(newTodo)
  }
  return (
    <section className="todoApp">
      <AppHeader createTask={createTask} />
      <main className="main">
        <TaskList todos={todoTaskFilter} deleteTask={deleteTask} completedTask={completedTask} editTask={editTask} />
      </main>
      <AppFooter
        countCompletedTask={countCompletedTask}
        deleteCompletedTask={deleteCompletedTask}
        filter={filter}
        filterTask={filterTask}
      />
    </section>
  )
}

export default App
