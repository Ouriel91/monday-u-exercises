import styles from './TodoList.module.css'
import useTodoList from './useTodoList'
import PropTypes from "prop-types";
import {todos} from '../../../../../state managment/selectors/items-entities-selectors'
import {useSelector} from "react-redux"

function TodoList({deleteTodo, editTodo}) {
  
  const todosArr = useSelector(todos)
  const {renderItems} = useTodoList(todosArr, deleteTodo, editTodo)
  
  return (
    <ul className={styles.todoListContainer}>
      {renderItems}
    </ul>
  )
}

TodoList.propTypes = {
  renderItems: PropTypes.array,
  deleteTodo: PropTypes.func, 
  editTodo: PropTypes.func
}

export default TodoList