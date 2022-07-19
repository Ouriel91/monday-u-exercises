import {editTodo, deleteTodo} from '../../../../../state-managment/actions/todo-actions'
import useUtils from '../../../../../utils/useUtils'
import styles from './TodoItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons' 

function TodoItem({todo = {}}) {

  const {getDispatch, getAlert} = useUtils()

  const handleEditCheck = async(todo, checkStatus) => {
      const editedTodo = await getDispatch(editTodo(todo.id, null, checkStatus))
      const message = `edited item ${editedTodo.itemName} to ${editedTodo.status ? "done" : "undone"}`
      getAlert(message, 2000, 'info')
  }
  
  const handleEditValue = async(todo) => {
      const value = prompt(`edit ${todo.itemName}`,todo.itemName)
                  
      if(value === null) return

      const editedTodo = await getDispatch(editTodo(todo.id,value, null))
      getAlert(`edited item to ${editedTodo.itemName}`, 2000, 'info')
  }
  
  const handleDelete = async(todo) => {
      const deletedItem = await getDispatch(deleteTodo(todo.id))
      getAlert(`delete ${deletedItem.itemName}`, 2000, 'error')
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