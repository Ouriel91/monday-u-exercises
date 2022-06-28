import styles from '../css/Sort.module.css'

function SortTodos() {
  return (
    <select className={styles.sort}>
      <option value="">ALL LIST</option>
      <option value="atoz">A-Z</option>
      <option value="ztoa">Z-A</option>
      <option value="dtou">DONE-UNDONE</option>
      <option value="utod">UNDONE-DONE</option>
    </select>
  )
}

export default SortTodos