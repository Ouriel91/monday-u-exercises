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

const loaderUpAction = () => ({
    type: actionsTypes.LOADER_UP
})

const loaderDownAction = () => ({
    type: actionsTypes.LOADER_DOWN
})

export const getTodos = () => {
    return async dispatch => {
        dispatch(loaderUpAction())
        const data = await itemClient.getTodoList()
        dispatch(getTodoListAction(data))
        dispatch(loaderDownAction())
    }
}

export const addTodo = (value) => {
  return async dispatch => {
    dispatch(loaderUpAction())
    const addedTodo = await itemClient.addTodo(value)
    dispatch(addTodoAction(addedTodo));
    dispatch(loaderDownAction())
  };
};

export const deleteTodo = (id) => {
    return async dispatch => {
        dispatch(loaderUpAction())
        const deletedTodo = await itemClient.deleteTodo(id)
        dispatch(deleteTodoAction(deletedTodo));
        dispatch(loaderDownAction())
    }
}

export const editTodo = (id, value, status) => {
    return async dispatch => {
        dispatch(loaderUpAction())
        const editedTodo = await itemClient.editTodo(id, value, status)
        dispatch(editTodoAction(editedTodo));
        dispatch(loaderDownAction())
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



