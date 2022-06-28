import styles from './SumTodos.module.css'

function SumTodos({length}) {
  return (
    <span className={styles.todosCount}>
      You have {length} pending tasks
    </span>
  )
}

export default SumTodos