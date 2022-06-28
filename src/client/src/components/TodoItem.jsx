import styles from '../css/TodoItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

function TodoItem() {
  return (
    <li className={styles.todoItem}>
        <input /* id="2" */ type="checkbox" /* checked="" */ />
        <div className={styles.todoTitle}>
          catch ivysaur with type grass/poison/
        </div>
        <img 
          className={styles.image}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
          alt="balbazuar" />
        <div className={styles.actions}>
          <div>
            <span className={[styles.actionBtn, styles.delete].join(' ')} /* id="2" */>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
          <div>
            <span className={[styles.actionBtn, styles.edit].join(' ')} /* id="2" */>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </div>
        </div>
        
      </li>
  )
}

export default TodoItem