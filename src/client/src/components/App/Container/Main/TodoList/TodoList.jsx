import styles from './TodoList.module.css'
import useTodoList from './useTodoList'
import {todos} from '../../../../../state managment/selectors/items-entities-selectors'
import {useSelector} from "react-redux"

function TodoList() {
  
  const todosArr = useSelector(todos)
  const {renderItems} = useTodoList(todosArr)
  
  return (
    <ul className={styles.todoListContainer}>
      {renderItems}
    </ul>
  )
}

export default TodoList