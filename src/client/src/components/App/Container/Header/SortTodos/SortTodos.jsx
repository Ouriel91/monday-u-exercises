import styles from './SortTodos.module.css'
import {useDispatch} from 'react-redux'
import {getTodos} from '../../../../../state-managment/actions/todo-actions'

function SortTodos() {

  const dispatch = useDispatch()
  const handleSorts = (e) => {
      dispatch(getTodos(`?sort=${e.target.value}`))
  }

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
