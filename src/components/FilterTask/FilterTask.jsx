import './FilterTask.css'

const FilterTask = ({ filter, filterTask }) => {
  return (
    <ul className="filters">
      <li>
        <button className={filter === 'all' ? 'selected' : null} onClick={() => filterTask('all')}>
          All
        </button>
      </li>
      <li>
        <button className={filter === 'active' ? 'selected' : null} onClick={() => filterTask('active')}>
          Active
        </button>
      </li>
      <li>
        <button className={filter === 'completed' ? 'selected' : null} onClick={() => filterTask('completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}
export default FilterTask