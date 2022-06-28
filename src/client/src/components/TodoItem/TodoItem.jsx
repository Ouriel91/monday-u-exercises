import styles from './TodoItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

function TodoItem({todo, addTodo, deleteTodo, editTodo}) {

  const handleEditCheck = (todo, checkStatus) => {
    editTodo(todo.id, null, checkStatus)
  }

  const handleEditValue = async (todo) => {
    const value = prompt(`edit ${todo.itemName}`,todo.itemName)
                
    if(value === null) return
    await editTodo(todo.id,value, null)
  }

  const handleDelete = (todo) => {
    deleteTodo(todo.id)
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
              onClick={() => handleDelete(todo)}>
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