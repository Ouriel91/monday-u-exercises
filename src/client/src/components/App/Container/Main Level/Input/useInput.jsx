import {useState} from 'react'
import { useAlert } from 'react-alert'
import {useDispatch} from 'react-redux'
import {addTodo, getTodos} from '../../../../../state managment/actions/todo-actions'

function useInput() {

    const [textInput, setTextInput] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()

    const handleAddTodo = async() => {

        if(textInput.trim() === '') {
            alert.show('Todo can not be empty', {
                timeout: 2000,
                type: 'error',
            })
            return
        }

        const addedTodo = await dispatch(addTodo(textInput))
        alert.show(`Added new todo ${addedTodo.itemName}`, {
            timeout: 2000,
            type: 'success',
        })
        dispatch(getTodos())
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