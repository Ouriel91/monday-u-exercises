import {useState, memo} from 'react'
import { useAlert } from 'react-alert'
import styles from './TodoInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";
import Button from "../../../../UI/Button"

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

  const content = <FontAwesomeIcon icon={faPlusCircle} />
  let anotherAddedClasses = ' addButton'
  if(textInput.length > 0 ){
    anotherAddedClasses += ' active'
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
        <Button 
          content={content} 
          clickFunc={handleAddTodo} 
          anotherAddedClasses={anotherAddedClasses}/>
    </div>
  )
}

TodoInput.propTypes = {
  addButton: PropTypes.func,
  setTextInput: PropTypes.func,
  handleAddTodo: PropTypes.func, 
  handleAddTodoWithEnter: PropTypes.func,
}

export default memo(TodoInput)