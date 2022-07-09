import useInput from './useInput'
import styles from './TodoInput.module.css'
import anotherStyles from '../../Container.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";

function TodoInput({addTodo}) {
  
  const {
    textInput = '', 
    setTextInput, 
    handleAddTodo, 
    handleAddTodoWithEnter
  } = useInput(addTodo)
  
  return (
    <div className={styles.inputContainer}>
      <input 
        className={styles.todoInput} 
        type="text" 
        placeholder="Add your new todo"
        onChange={(e) => {
          setTextInput(e.target.value)
        }}
        onKeyUp={handleAddTodoWithEnter}
        value={textInput} />
      <button 
        className={[anotherStyles.button, styles.addButton, textInput.length > 0 ? styles.active:""].join(' ')}
        onClick={handleAddTodo}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
    </div>
  )
}

TodoInput.propTypes = {
  addButton: PropTypes.func,
  setTextInput: PropTypes.func,
  handleAddTodo: PropTypes.func, 
  handleAddTodoWithEnter: PropTypes.func,
}

export default TodoInput