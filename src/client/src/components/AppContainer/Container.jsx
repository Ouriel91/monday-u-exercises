import {useEffect, useState} from 'react'
import ItemClient from '../../server-api/item-client';
import styles from './Container.module.css';
import Top from '../Top/Top'
import Loader from '../Loader/Loader'
import Input from '../Input/Input'
import EmptyTodosShow from '../EmptyTodosShow/EmptyTodosShow'
import TodoList from '../TodoList/TodoList'
import Bottom from '../Bottom/Bottom'

function Container() {

    const [todos, setTodos] = useState([])
    
    let count = 0;
    useEffect(() => {
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
            alert(`edited item ${editedTodo.itemName} to ${editedTodo.status}`)
        }
        
        getTodos()
    }


    return (
        <div className={styles.container}>
            <Top getTodos={getTodos}/>
            <Loader />
            <Input addTodo={addTodo}/>
            {
            todos.length > 0 ? 
                <TodoList 
                    todos={todos}
                    addTodo={addTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}/> 
                : 
                <EmptyTodosShow />
            } 
            <Bottom length={todos.length} deleteTodo={deleteTodo}/>
        </div>
    )
}

export default Container