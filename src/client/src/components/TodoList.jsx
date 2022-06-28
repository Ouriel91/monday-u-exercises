import styles from '../css/TodoList.module.css'
import TodoItem from './TodoItem'

function TodoList() {
  return (
    <ul className={styles.todoListContainer}>
      <TodoItem />
    </ul>
  )
}

export default TodoList