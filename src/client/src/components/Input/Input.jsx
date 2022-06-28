import styles from './Input.module.css'
import anotherStyles from '../AppContainer/Container.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

function Input() {
  return (
    <div className={styles.inputContainer}>
      <input className={styles.todoInput} type="text" placeholder="Add your new todo" />
      <button className={[anotherStyles.button, styles.addButton].join(' ')}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
    </div>
  )
}

export default Input