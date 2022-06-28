import {useEffect, useState} from 'react'
import ItemClient from '../../server-api/item-client';

function useContainer() {

    const [todos, setTodos] = useState([])
    const [loader, setLoader] = useState(false)
    
    let count = 0;
    useEffect(() => {
        //prevent from use effect run twice (react 18+)
        if(count < 1)
            getTodos()
        count++;
    },[]) // eslint-disable-line

    const itemClient = new ItemClient();

    const getTodos = async(query = "") => {
        setLoader(true);
        const items = await itemClient.getTodoList(query);
        setTodos(items);
        setLoader(false);
    }

    const addTodo = async(value) => {
        setLoader(true);
        await itemClient.addTodo(value);
        alert(`added new todo`)
        setLoader(false);
        getTodos()
    }

    const deleteTodo = async(id) => {
     
        setLoader(true);

        const deletedItem = await itemClient.deleteTodo(id);
        if(deletedItem.id) {
            alert(`delete ${deletedItem.itemName}`)
        }
        else{
            alert(`delete all todos`)
        }

        setLoader(false);
        getTodos()
    }

    const editTodo = async(id, value, status) => {

        setLoader(true);
        const editedTodo = await itemClient.editTodo(id, value, status)
        if(value !== null){
            alert(`edited item to ${editedTodo.itemName}`)
        }
        else if(status !== null){
            alert(`edited item ${editedTodo.itemName} to ${editedTodo.status ? "done" : "undone"}`)
        }
        
        setLoader(false);
        getTodos()
    }

    return {
        addTodo, 
        editTodo, 
        deleteTodo, 
        getTodos, 
        todos, 
        loader
    }
}

export default useContainer