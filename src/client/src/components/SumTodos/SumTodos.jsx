import styles from './SumTodos.module.css'
import PropTypes from "prop-types";

function SumTodos({length = 0}) {
  return (
    <span className={styles.todosCount}>
      You have {length} pending tasks
    </span>
  )
}

SumTodos.propTypes = {
  length: PropTypes.number
}

export default SumTodos