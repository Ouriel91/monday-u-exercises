import {useDispatch} from 'react-redux'
import {editTodo, deleteTodo} from '../../../../../state-managment/actions/todo-actions'
import { useAlert } from 'react-alert'
import styles from './TodoItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons' 

function TodoItem({todo = {}}) {

  const dispatch = useDispatch()
  const alert = useAlert()

  const handleEditCheck = (todo, checkStatus) => {
      const editedTodo =  dispatch(editTodo(todo.id, null, checkStatus))
        alert.show(`edited item ${editedTodo.itemName} to ${editedTodo.status ? "done" : "undone"}`, {
          timeout: 2000,
          type: 'info',
      })
  }
  
  const handleEditValue = (todo) => {
      const value = prompt(`edit ${todo.itemName}`,todo.itemName)
                  
      if(value === null) return

      const editedTodo = dispatch(editTodo(todo.id,value, null))
      alert.show(`edited item to ${editedTodo.itemName}`, {
          timeout: 2000,
          type: 'info',
      })
  }
  
  const handleDelete = (todo) => {
      const deletedItem =  dispatch(deleteTodo(todo.id))
      alert.show(`delete ${deletedItem.itemName}`, {
          timeout: 2000,
          type: 'error',
      })
  }
  
  return (
    <li className={styles.todoItem}>
        <input type="checkbox" 
          checked={todo.status}
          onChange={(e) => handleEditCheck(todo, e.target.checked)} />
        <div className={styles.todoTitle}>
          {todo.itemName}
        </div>
        <img 
          className={styles.image}
          src={todo.imagePokemonPath}
          alt={todo.imagePokemon ? todo.itemName : null} />
        <div className={styles.actions}>
          <div>
            <span 
              className={[styles.actionBtn, styles.delete].join(' ')} 
              onClick={() =>handleDelete(todo)}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
          <div>
            <span 
              className={[styles.actionBtn, styles.edit].join(' ')}
              onClick={() => handleEditValue(todo)}>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </div>
        </div>
        
      </li>
  )
}

export default TodoItem