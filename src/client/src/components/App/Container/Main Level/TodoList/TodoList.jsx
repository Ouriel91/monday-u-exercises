import styles from './TodoList.module.css'
import useTodoList from './useTodoList'
import PropTypes from "prop-types";

function TodoList({todos = [], deleteTodo, editTodo}) {
  
  const {renderItems} = useTodoList(todos, deleteTodo, editTodo)
  
  return (
    <ul className={styles.todoListContainer}>
      {renderItems}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  renderItems: PropTypes.array,
  deleteTodo: PropTypes.func, 
  editTodo: PropTypes.func
}

export default TodoList