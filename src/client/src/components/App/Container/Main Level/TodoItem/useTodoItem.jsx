import {useDispatch} from 'react-redux'
import {editTodo, deleteTodo, getTodos} from '../../../../../state managment/actions/todo-actions'
import { useAlert } from 'react-alert'

function useTodoItem() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const handleEditCheck = async(todo, checkStatus) => {
        const editedTodo = await dispatch(editTodo(todo.id, null, checkStatus))
         alert.show(`edited item ${editedTodo.itemName} to ${editedTodo.status ? "done" : "undone"}`, {
            timeout: 2000,
            type: 'info',
        })
        dispatch(getTodos())
    }
    
    const handleEditValue = async(todo) => {
        const value = prompt(`edit ${todo.itemName}`,todo.itemName)
                    
        if(value === null) return
        const editedTodo = await dispatch(editTodo(todo.id,value, null))
        alert.show(`edited item to ${editedTodo.itemName}`, {
            timeout: 2000,
            type: 'info',
        })
        dispatch(getTodos())
    }
    
    const handleDelete = async(todo) => {
        const deletedItem = await dispatch(deleteTodo(todo.id))
        alert.show(`delete ${deletedItem.itemName}`, {
            timeout: 2000,
            type: 'error',
        })
        dispatch(getTodos())
    }

    return {handleEditValue, handleDelete, handleEditCheck}
}

export default useTodoItem