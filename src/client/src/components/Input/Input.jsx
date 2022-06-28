import {useState} from 'react'
import styles from './Input.module.css'
import anotherStyles from '../AppContainer/Container.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

function Input({addTodo}) {
  const [textInput, setTextInput] = useState('')

  const handleAddTodo = () => {

    if(textInput.trim() === '') {
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

export default Input