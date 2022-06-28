import styles from './SortTodos.module.css'
import useSortTodos from './useSortTodos'

function SortTodos({getTodos}) {

  const {handleSorts} = useSortTodos(getTodos)

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

export default SortTodos