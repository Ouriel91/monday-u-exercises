import styles from './SumTodos.module.css'
import PropTypes from "prop-types";

function SumTodos({todosLength = 0}) {
  return (
    <span className={styles.todosCount}>
      You have {todosLength} pending tasks
    </span>
  )
}

SumTodos.propTypes = {
  todosLength: PropTypes.number
}

export default SumTodos