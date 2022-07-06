import actionsTypes from "./constants";
import ItemClient from "../../server-api/item-client";
const itemClient = new ItemClient()

const getTodoListAction = (todos) => ({
    type: actionsTypes.GET_TODOLIST,
    todos: todos
})

const addTodoAction = (item) => ({
  type: actionsTypes.ADD_TODO,
  item: item
});

const editTodoAction = (item) => ({
    type: actionsTypes.EDIT_TODO,
    item: item
})

const deleteTodoAction = (item) => ({
    type: actionsTypes.DELETE_TODO,
    item: item
})

const clearAllAction = () => ({
    type: actionsTypes.CLEAR_ALL,
})

const loaderUpAction = () => ({
    type: actionsTypes.LOADER_UP
})

const loaderDownAction = () => ({
    type: actionsTypes.LOADER_DOWN
})
const setErrorAction = (error) => ({
    type: actionsTypes.SET_ERROR,
    message:error
})

export const getTodos = (query = "") => {
    return async dispatch => {
        dispatch(loaderUpAction())
        try{
            const data = await itemClient.getTodoList(query)
            dispatch(getTodoListAction(data))
            dispatch(loaderDownAction())
        }catch(error){
            if(query === ""){
                dispatch(setErrorAction('can not get list, please try again later'))
            }
            if(query.includes("filter")){
                dispatch(setErrorAction('can not filter list, please try again later'))
            }
            
            if(query.includes("sort")){
                dispatch(setErrorAction('can not sort list, please try again later'))
            }
        } 
    }
}

export const addTodo = (value) => {

    return async dispatch => {
        dispatch(loaderUpAction())
        try{
            const addedTodo = await itemClient.addTodo(value)
            dispatch(addTodoAction(addedTodo));
            dispatch(loaderDownAction())
            return addedTodo
        }catch(error){
            dispatch(setErrorAction('can not add to list, please try again later'))   
        }       
    };
};

export const deleteTodo = (id) => {
    return async dispatch => {
        dispatch(loaderUpAction())
        try{
            const deletedTodo = await itemClient.deleteTodo(id)
            dispatch(deleteTodoAction(deletedTodo));
            if(id === 'delete-all'){
                dispatch(clearAllAction())
            }
            dispatch(loaderDownAction())
            return deletedTodo
        }catch(error){
            if(id === 'delete-all'){
                dispatch(setErrorAction('can not clear all list, please try again later'))   
            }
            else{
                dispatch(setErrorAction('can not delete item from list, please try again later'))   
            }
        }
        
    }
}

export const editTodo = (id, value, status) => {
    return async dispatch => {
        dispatch(loaderUpAction())
        try {
            const editedTodo = await itemClient.editTodo(id, value, status)
            dispatch(editTodoAction(editedTodo));
            dispatch(loaderDownAction())
            return editedTodo
        }catch(error){
            if(status !== null){
                dispatch(setErrorAction('can not check/uncheck item in list, please try again later'))   
            }

            if(value !== null){
                dispatch(setErrorAction('can not edit item in list, please try again later'))   
            }
        }
    }
}

export const loaderUp = () => {
    return dispatch => {
        dispatch(loaderUpAction())
    }
}

export const loaderDown = () => {
    return dispatch => {
        dispatch(loaderDownAction())
    }
}
export const setError = (error) => {
    return dispatch => {
        dispatch(setErrorAction(error))
    }
}

export const clearAll = () => {
    return dispatch => {
        dispatch(clearAllAction())
    }
}



