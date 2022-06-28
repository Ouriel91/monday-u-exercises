import {useState} from 'react'

function useInput(addTodo) {

    const [textInput, setTextInput] = useState('')

    const handleAddTodo = () => {

        if(textInput.trim() === '') {
            alert('Todo can not be empty')
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