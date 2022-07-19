import {useState} from 'react'
import useUtils from '../../../../../utils/useUtils'
import {addTodo} from '../../../../../state-managment/actions/todo-actions'
import styles from './TodoInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Button from "../../../../UI/Button"

function TodoInput() {
  
  const [textInput, setTextInput] = useState('')
  const {getDispatch, getAlert} = useUtils()

  const handleAddTodo = async() => {

      if(textInput.trim() === '') {
          getAlert('Todo can not be empty', 2000, 'error')
          return
      }

      await getDispatch(addTodo(textInput))
      getAlert('Added new todo/s', 2000, 'success')

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