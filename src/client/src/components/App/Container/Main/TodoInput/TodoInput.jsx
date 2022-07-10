import {useState} from 'react'
import { useAlert } from 'react-alert'
import styles from './TodoInput.module.css'
import anotherStyles from '../../Container.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";

function TodoInput({addTodo}) {
  
  const [textInput, setTextInput] = useState('')
    const alert = useAlert()

    const handleAddTodo = () => {

        if(textInput.trim() === '') {
            alert.show('Todo can not be empty', {
                timeout: 2000,
                type: 'error',
            })
            return
        }

        addTodo(textInput)
        setTextInput('')
    }

    const handleAddTodoWithEnter = (e) => {
        if(e.key === 'Enter'){
            handleAddTodo()
        }
    }

  
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