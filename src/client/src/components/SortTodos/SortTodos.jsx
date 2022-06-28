import styles from './SortTodos.module.css'

function SortTodos({getTodos}) {

  const handleSorts = (e) => {
      getTodos(`?sort=${e.target.value}`)
  }

  return (
    <select className={styles.sort} onChange={handleSorts} value="">
      <option value="">ALL LIST</option>
      <option value="atoz">A-Z</option>
      <option value="ztoa">Z-A</option>
      <option value="dtou">DONE-UNDONE</option>
      <option value="utod">UNDONE-DONE</option>
    </select>
  )
}

export default SortTodos