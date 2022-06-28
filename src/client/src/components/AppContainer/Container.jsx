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
            <Bottom />
        </div>
    )
}

export default Container