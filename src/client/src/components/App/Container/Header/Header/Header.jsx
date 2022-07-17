import styles from './Header.module.css';
import FilterTodos from '../../Header/FilterTodos/FilterTodos'
import SortTodos from '../../Header/SortTodos/SortTodos'
import Title from '../Title/Title'

function Header() {
  return (
    <div className={styles.top}>
        <Title />
        <FilterTodos />
        <SortTodos />
    </div>
  )
}

export default Header