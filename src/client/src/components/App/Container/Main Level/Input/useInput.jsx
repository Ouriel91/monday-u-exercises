import {useState} from 'react'
import { useAlert } from 'react-alert'

function useInput(addTodo) {

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

    return {
        textInput, 
        setTextInput, 
        handleAddTodo, 
        handleAddTodoWithEnter
    }
}

export default useInput