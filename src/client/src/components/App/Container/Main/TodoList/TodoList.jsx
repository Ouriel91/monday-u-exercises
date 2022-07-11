import styles from './TodoList.module.css'
import PropTypes from "prop-types";
import EmptyTodosShow from '../EmptyTodosShow/EmptyTodosShow'
import TodoItem from '../TodoItem/TodoItem'

function TodoList({todos = [], deleteTodo, editTodo}) {
  
  const renderItems = todos.map(todo => <TodoItem 
    key={todo.id} 
    todo={todo}
    deleteTodo={deleteTodo}
    editTodo={editTodo}/>)
  const listWithItems = <ul className={styles.todoListContainer}>{renderItems}</ul>
  const renderComponent = todos.length > 0 ? listWithItems : <EmptyTodosShow />
  
  return (
    <>
      {renderComponent}
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  renderItems: PropTypes.array,
  deleteTodo: PropTypes.func, 
  editTodo: PropTypes.func
}

export default TodoList