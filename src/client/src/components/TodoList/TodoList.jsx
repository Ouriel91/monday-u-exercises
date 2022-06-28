import styles from './TodoList.module.css'
import TodoItem from '../TodoItem/TodoItem'

function TodoList({todos, addTodo, deleteTodo, editTodo}) {
  const renderItems = todos.map(todo => <TodoItem 
      key={todo.id} 
      todo={todo}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      editTodo={editTodo}/>)
  return (
    <ul className={styles.todoListContainer}>
      {renderItems}
    </ul>
  )
}

export default TodoList