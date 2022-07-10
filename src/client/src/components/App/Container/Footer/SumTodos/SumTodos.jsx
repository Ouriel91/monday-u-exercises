import styles from './SumTodos.module.css'
import useSumTods from './useSumTods'

function SumTodos() {

  const {length} = useSumTods()
  
  return (
    <span className={styles.todosCount}>
      You have {length} pending tasks
    </span>
  )
}


export default SumTodos