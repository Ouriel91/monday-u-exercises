import styles from './TodoList.module.css'
import TodoItem from '../TodoItem/TodoItem'
import EmptyTodosShow from '../EmptyTodosShow/EmptyTodosShow'
import {todos} from '../../../../../state-managment/selectors/items-entities-selectors'
import {useSelector} from "react-redux"

function TodoList() {
  
  const todosArr = useSelector(todos)
  const renderItems = todosArr.map(todo => <TodoItem 
    key={todo.id} 
    todo={todo}/>
  )
  const listWithItems = <ul className={styles.todoListContainer}>{renderItems}</ul>
  const renderComponent = todosArr.length > 0 ? listWithItems : <EmptyTodosShow />
  
  return (
    <>
      {renderComponent}
    </>
  )
}

export default TodoList