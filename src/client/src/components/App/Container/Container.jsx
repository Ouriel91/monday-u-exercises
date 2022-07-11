import {useEffect, useState, useCallback} from 'react'
import ItemClient from '../../../server-api/item-client';
import { useAlert } from 'react-alert'
import styles from './Container.module.css';
import Header from './Header/Header/Header'
import Loader from './Main/Loader/Loader'
import TodoInput from './Main/TodoInput/TodoInput'
import TodoList from './Main/TodoList/TodoList'
import Footer from './Footer/Footer'
import PropTypes from "prop-types";

function Container() {

    const [todos, setTodos] = useState([])
    const [isLoading, setLoader] = useState(false)
    const alert = useAlert()
    
    let count = 0;
    useEffect(() => {
        //prevent from use effect run twice (react 18+)
        if(count < 1)
            getTodos()
        count++;
    },[]) // eslint-disable-line

    const itemClient = new ItemClient();

    const getTodos = useCallback(async(query = "") => {
        setLoader(true);
        const items = await itemClient.getTodoList(query);
        setTodos(items);
        setLoader(false);
    },[])// eslint-disable-line

    const addTodo = useCallback(async(value) => {
        setLoader(true);
        await itemClient.addTodo(value);
        setLoader(false);
        alert.show('Added new todo', {
            timeout: 2000,
            type: 'success',
        })
        getTodos()
    },[])// eslint-disable-line

    const deleteTodo = useCallback(async(id) => {
     
        setLoader(true);

        const deletedItem = await itemClient.deleteTodo(id);
        if(deletedItem.id) {
            alert.show(`delete ${deletedItem.itemName}`, {
                timeout: 2000,
                type: 'error',
            })
        }
        else{
            alert.show('delete all todos', {
                timeout: 2000,
                type: 'error',
            })
        }

        setLoader(false);
        getTodos()
    },[]);// eslint-disable-line

    const editTodo = useCallback(async(id, value, status) => {

        setLoader(true);
        const editedTodo = await itemClient.editTodo(id, value, status)
        if(value !== null){
            alert.show(`edited item to ${editedTodo.itemName}`, {
                timeout: 2000,
                type: 'info',
            })
        }
        else if(status !== null){
            alert.show(`edited item ${editedTodo.itemName} to ${editedTodo.status ? "done" : "undone"}`, {
                timeout: 2000,
                type: 'info',
            })
        }
        
        setLoader(false);
        getTodos()
    },[])// eslint-disable-line


    return (
        <div className={styles.container}>
            <Header getTodos={getTodos}/>
            
            {isLoading ? <Loader /> : null}
            <TodoInput addTodo={addTodo}/>
            <TodoList 
                todos={todos}
                deleteTodo={deleteTodo}
                editTodo={editTodo}/>  
            <Footer todosLength={todos.length} deleteTodo={deleteTodo}/>
        </div>
    )
}

Container.propTypes = {
    isLoading: PropTypes.bool,
    todos: PropTypes.array,
    addTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func,
    getTodos: PropTypes.func,
}

export default Container