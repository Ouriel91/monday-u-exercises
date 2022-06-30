import styles from './Top.module.css';
import FilterTodos from '../FilterTodos/FilterTodos'
import SortTodos from '../SortTodos/SortTodos'
import PropTypes from "prop-types";

function Top({getTodos}) {
  return (
    <div className={styles.top}>
        <div className={styles.title}>PokeDoList</div>
        <p style={{width: '10%'}}>undone/done</p>
        <FilterTodos getTodos={getTodos}/>
        <SortTodos getTodos={getTodos}/>
    </div>
  )
}

Top.propTypes = {
  getTodos: PropTypes.func
}

export default Top