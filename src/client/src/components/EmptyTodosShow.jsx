import styles from '../css/EmptyTodosShow.module.css'

function EmptyTodosShow() {
  return (
    <div className={styles.emptyTodosMessage}>
        <h1 className={styles.enterTodotitle}>Enter Todos</h1>
    </div>
  )
}

export default EmptyTodosShow