import './AppFooter.css'
import FilterTask from "../FilterTask/FilterTask"

const AppFooter = ({ countCompletedTask, deleteCompletedTask, filter, filterTask }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countCompletedTask} items left</span>
      <FilterTask filter={filter} filterTask={filterTask} />
      <button className="clear-completed" onClick={deleteCompletedTask}>
        Clear completed
      </button>
    </footer>
  )
}
export default AppFooter