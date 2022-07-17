import {useState} from 'react'
import { useAlert } from 'react-alert'
import {useDispatch} from 'react-redux'
import {addTodo} from '../../../../../state-managment/actions/todo-actions'
import styles from './TodoInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Button from "../../../../UI/Button"

function TodoInput() {
  
  const [textInput, setTextInput] = useState('')
  const alert = useAlert()
  const dispatch = useDispatch()

  const handleAddTodo = () => {

      if(textInput.trim() === '') {
          alert.show('Todo can not be empty', {
              timeout: 2000,
              type: 'error',
          })
          return
      }

      dispatch(addTodo(textInput))
      alert.show(`Added new todo/s`, {
          timeout: 2000,
          type: 'success',
      })

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


export default TodoInput