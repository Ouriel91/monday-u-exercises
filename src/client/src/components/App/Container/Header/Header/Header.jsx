import styles from './Header.module.css';
import FilterTodos from '../FilterTodos/FilterTodos'
import SortTodos from '../SortTodos/SortTodos'
import PropTypes from "prop-types";
import Title from '../Title/Title'

function Header({getTodos}) {
  return (
    <div className={styles.top}>
        <Title />
        <FilterTodos getTodos={getTodos}/>
        <SortTodos getTodos={getTodos}/>
    </div>
  )
}

Header.propTypes = {
  getTodos: PropTypes.func
}

export default Header