import styles from './Top.module.css';
import FilterTodos from '../../Top Level/FilterTodos/FilterTodos'
import SortTodos from '../../Top Level/SortTodos/SortTodos'
import PropTypes from "prop-types";
import Title from '../Title/Title'

function Top({getTodos}) {
  return (
    <div className={styles.top}>
        <Title />
        <FilterTodos getTodos={getTodos}/>
        <SortTodos getTodos={getTodos}/>
    </div>
  )
}

Top.propTypes = {
  getTodos: PropTypes.func
}

export default Top