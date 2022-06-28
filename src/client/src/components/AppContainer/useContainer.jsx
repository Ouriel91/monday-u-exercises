import {useEffect, useState} from 'react'
import ItemClient from '../../server-api/item-client';

function useContainer() {

    const [todos, setTodos] = useState([])
    
    let count = 0;
    useEffect(() => {
        //prevent from use effect run twice (react 18+)
        if(count < 1)
            getTodos()
        count++;
    },[]) // eslint-disable-line

    const itemClient = new ItemClient();

    const getTodos = async(query = "") => {
        const items = await itemClient.getTodoList(query);
        setTodos(items);
    }

    const addTodo = async(value) => {
      
        await itemClient.addTodo(value);
        alert(`added new todo`)
        getTodos()
    }

    const deleteTodo = async(id) => {
     
        const deletedItem = await itemClient.deleteTodo(id);
        if(deletedItem.id) {
            alert(`delete ${deletedItem.itemName}`)
        }
        else{
            alert(`delete all todos`)
        }
        
        getTodos()
    }

    const editTodo = async(id, value, status) => {

        const editedTodo = await itemClient.editTodo(id, value, status)
        if(value !== null){
            alert(`edited item to ${editedTodo.itemName}`)
        }
        else if(status !== null){
            alert(`edited item ${editedTodo.itemName} to ${editedTodo.status ? "done" : "undone"}`)
        }
        
        getTodos()
    }

    return {
        addTodo, 
        editTodo, 
        deleteTodo, 
        getTodos, 
        todos
    }
}

export default useContainer