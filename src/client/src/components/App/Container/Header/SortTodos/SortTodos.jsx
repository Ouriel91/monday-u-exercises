import styles from './SortTodos.module.css'
import useSortTodos from './useSortTodos'
import PropTypes from "prop-types";

function SortTodos() {

  const {handleSorts} = useSortTodos()

  return (
    <select className={styles.sort} onChange={handleSorts}>
      <option value="">ALL LIST</option>
      <option value="atoz">A-Z</option>
      <option value="ztoa">Z-A</option>
      <option value="dtou">DONE-UNDONE</option>
      <option value="utod">UNDONE-DONE</option>
    </select>
  )
}

SortTodos.propTypes = {
  getTodos: PropTypes.func,
  handleSorts: PropTypes.func,
}

export default SortTodos