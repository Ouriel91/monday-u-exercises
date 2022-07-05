import styles from './Top.module.css';
import FilterTodos from '../../Top Level/FilterTodos/FilterTodos'
import SortTodos from '../../Top Level/SortTodos/SortTodos'
import PropTypes from "prop-types";
import Title from '../Title/Title'

function Top() {
  return (
    <div className={styles.top}>
        <Title />
        <FilterTodos />
        <SortTodos />
    </div>
  )
}

Top.propTypes = {
  getTodos: PropTypes.func
}

export default Top