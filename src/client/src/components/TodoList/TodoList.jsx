import styles from './TodoList.module.css'
import TodoItem from '../TodoItem/TodoItem'

function TodoList() {
  return (
    <ul className={styles.todoListContainer}>
      <TodoItem />
    </ul>
  )
}

export default TodoList