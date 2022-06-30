function useTodoItem(editTodo, deleteTodo) {

    const handleEditCheck = async(todo, checkStatus) => {
        await editTodo(todo.id, null, checkStatus)
    }
    
    const handleEditValue = async(todo) => {
        const value = prompt(`edit ${todo.itemName}`,todo.itemName)
                    
        if(value === null) return
        await editTodo(todo.id,value, null)
    }
    
    const handleDelete = async(todo) => {
        await deleteTodo(todo.id)
    }

    return {handleEditValue, handleDelete, handleEditCheck}
}

export default useTodoItem