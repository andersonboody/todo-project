import NewTaskForm from "../NewTaskForm/NewTaskForm"

const AppHeader = ({ createTask }) => {
  return (
    <header>
      <h1>todos</h1>
      <NewTaskForm createTask={createTask}/>
  </header>
  )
}
export default AppHeader