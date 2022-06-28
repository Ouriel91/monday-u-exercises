import styles from './Top.module.css';
import FilterTodos from '../FilterTodos/FilterTodos'
import SortTodos from '../SortTodos/SortTodos'

function Top() {
  return (
    <div className={styles.top}>
        <div className={styles.title}>PokeDoList</div>
        <p style={{width: '10%'}}>undone/done</p>
        <FilterTodos />
        <SortTodos />
    </div>
  )
}

export default Top