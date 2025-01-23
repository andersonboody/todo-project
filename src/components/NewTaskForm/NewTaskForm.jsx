import { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ createTask }) => {
  const [ label, setLabel ] = useState('')
  const [ min, setMin ] = useState('')
  const [ sec, setSec ] = useState('')

  const newAddTask = (e) => {
    const { name, value } = e.target
    if (name === 'label' && value === ' ') {
      return alert('Первый символ не должен быть пробелом!')
    }
    if ((name === 'min' || name === 'sec') && (value >= 60 || isNaN(value))) {
      return alert('Пожалуйста, введите корректное число!')
    }
    if(name === 'label') {
      setLabel(value)
    } else if(name === 'min') {
      setMin(value)
    } else {
      setSec(value)
    }
  }
  const onSubmitForm = (e) => {
    e.preventDefault()
    createTask(label, min, sec)
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmitForm}>
      <input
        type="text"
        name="label"
        className="new-todo"
        placeholder="What needs to be done?"
        value={label}
        onChange={newAddTask}
        autoFocus
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        name="min"
        onChange={newAddTask}
        value={min}
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        name="sec"
        onChange={newAddTask}
        value={sec}
        required
      />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )  
}
export default NewTaskForm