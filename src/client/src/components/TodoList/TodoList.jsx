import styles from './TodoList.module.css'
import useTodoList from './useTodoList'

function TodoList({todos, addTodo, deleteTodo, editTodo}) {
  
  const {renderItems} = useTodoList(todos, addTodo, deleteTodo, editTodo)
  
  return (
    <ul className={styles.todoListContainer}>
      {renderItems}
    </ul>
  )
}

export default TodoList