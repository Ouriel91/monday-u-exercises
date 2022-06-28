import {useEffect, useState} from 'react'
import ItemClient from '../server-api/item-client';
import styles from '../css/Container.module.css';
import Top from './Top'
import Loader from './Loader'
import Input from './Input'
import EmptyTodosShow from './EmptyTodosShow'
import TodoList from './TodoList'


function Container() {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    },[]) // eslint-disable-line

    const itemClient = new ItemClient();

    const getTodos = async() => {
        const items = await itemClient.getTodoList()
        console.log(items)
        setTodos(items);
    }

    const addTodo = async(value) => {
        await itemClient.addTodo(value);
        getTodos()
    }

    const deleteTodo = async(id) => {
        await itemClient.deleteTodo(id);
        getTodos()
    }

    const editTodo = async(id, value, status) => {
        await itemClient.editTodo(id, value, status)
        getTodos()
    }


    return (
        <div className={styles.container}>
            <Top />
            <Loader />
            <Input />
            <EmptyTodosShow />
            <TodoList />
        </div>
    )
}

export default Container