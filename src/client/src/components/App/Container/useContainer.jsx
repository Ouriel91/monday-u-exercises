import {useEffect, useState} from 'react'
import ItemClient from '../../../server-api/item-client';
import { useAlert } from 'react-alert'
import {useDispatch} from 'react-redux'
import {getTodos} from '../../../state managment/actions/todo-actions'
import {useSelector} from 'react-redux'
import {todosLength} from '../../../state managment/selectors/items-entities-selectors'

function useContainer() {

    const [todos, setTodos] = useState([])
    const [loader, setLoader] = useState(false)
    const alert = useAlert()
    const dispatch = useDispatch()
    const listLength = useSelector(todosLength)
    
    let count = 0;
    useEffect(() => {
        //prevent from use effect run twice (react 18+)
        if(count < 1)
            dispatch(getTodos())
        count++;
    },[]) // eslint-disable-line

    const itemClient = new ItemClient();

    const getTodos1 = async(query = "") => {
        setLoader(true);
        const items = await itemClient.getTodoList(query);
        setTodos(items);
        setLoader(false);
    }

    const addTodo = async(value) => {
        setLoader(true);
        await itemClient.addTodo(value);
        setLoader(false);
        alert.show('Added new todo', {
            timeout: 2000,
            type: 'success',
        })
        getTodos1()
    }

    const deleteTodo = async(id) => {
     
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
        getTodos1()
    }

    const editTodo = async(id, value, status) => {

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
        getTodos1()
    }

    return {
        addTodo, 
        editTodo, 
        deleteTodo, 
        getTodos, 
        todos, 
        loader,
        listLength
    }
}

export default useContainer