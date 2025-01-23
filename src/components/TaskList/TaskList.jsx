import { useState } from 'react'

import './TaskList.css'
import Task from '../Task/Task'

const TaskList = (props) => {
  const { todos, deleteTask, completedTask, editTask } = props

  const [editId, setEditID] = useState(null)
  const [editLabel, setEditLabel] = useState('')

  const startEditingTask = (id, label) => {
    setEditID(id)
    setEditLabel(label)
  }
  const editingLabel = (e) => {
    setEditLabel(e.target.value)
  }
  const saveEditing = (e) => {
    if (e.key === 'Enter') {
      editTask(editId, editLabel)
      setEditID(null)
      setEditLabel('')
    }
  }

  const elements = todos.map((item) => {
    const { id, label, timer, createDate, completed, show } = item

    let classNames = ''
    if (completed === 'completed') classNames = 'completed'
    if (!show) classNames = 'show'

    const isEdit = editId === id

    return (
      <li key={id} className={classNames}>
        {isEdit ? (
          <input type="text" className="edit" value={editLabel} onChange={editingLabel} onKeyDown={saveEditing} />
        ) : (
          <Task
            id={id}
            label={label}
            createDate={createDate}
            timer={timer}
            completedTask={() => completedTask(id)}
            deleteTask={() => deleteTask(id)}
            onEditTask={() => startEditingTask(id, label)}
          />
        )}
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}
export default TaskList
