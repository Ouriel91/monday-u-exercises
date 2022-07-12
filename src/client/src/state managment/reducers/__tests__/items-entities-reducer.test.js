import itemsEntitiesReducer from '../items-entities-reducer'
//check only reducer functions
import {getTodoListAction, 
    addTodoAction, 
    deleteTodoAction,
    loaderUpAction,
    loaderDownAction,
    editTodoAction,
    searchAction,
    clearAllAction
} from '../../actions/todo-actions'

//test initial
const initState = { todos: [], loader: false, errorMessage: '', search_value: ''}

//test empty
const getEmptyList = {todos: []}

//test add single todo
const addSingleItem = { id: 1,isPokemon: false,itemName: "buy milk",status: false}
const arrTest1 = {todos: [addSingleItem],
    loader: false, errorMessage: '', search_value: ''}

//test add multiple todos
const multipleTodos = [{ id: 2,isPokemon: true,itemName: "pok2",status: false},
{ id: 3,isPokemon: true,itemName: "pok3",status: false}]
const arrAfterSingleAndMultipleTodos = [
{ id: 1,isPokemon: false,itemName: "buy milk",status: false},
{ id: 2,isPokemon: true,itemName: "pok2",status: false},
{ id: 3,isPokemon: true,itemName: "pok3",status: false}]
const arrTest2 = {todos: arrAfterSingleAndMultipleTodos,
    loader: false, errorMessage: '', search_value: ''}

//test delete todo
const deleteItem =  { id: 2,isPokemon: true,itemName: "pok2",status: false}
const arrAfterDeleteSecondItem = [
    { id: 1,isPokemon: false,itemName: "buy milk",status: false},
    { id: 3,isPokemon: true,itemName: "pok3",status: false}
]
const arrTest3 = {
    todos: arrAfterDeleteSecondItem,
    loader: false, errorMessage: '', search_value: ''
}

//test edit value todo
const editedItem = { id: 1,isPokemon: false,itemName: "buy pok3",status: false}
const arrAfterEditFirstItem = [
    { id: 1,isPokemon: false,itemName: "buy pok3",status: false},
    { id: 3,isPokemon: true,itemName: "pok3",status: false}
]
const arrTest4 = {
    todos: arrAfterEditFirstItem,
    loader: false, errorMessage: '', search_value: ''
}

//test edit check todo
const editedCheckItem = { id: 3,isPokemon: true,itemName: "pok3",status: true}
const arrAfterEditCheckThirdItem = [
    { id: 1,isPokemon: false,itemName: "buy pok3",status: false},
    { id: 3,isPokemon: true,itemName: "pok3",status: true}
]
const arrTest5 = {
    todos: arrAfterEditCheckThirdItem,
    loader: false, errorMessage: '', search_value: ''
}

test('should return the initial state', () => {
  expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual(initState)
})

test('loader up', () => {
    const previousState = initState
    expect(itemsEntitiesReducer(previousState, loaderUpAction())).toEqual(
        { todos: [], loader: true, errorMessage: '', search_value: ''}
    )
})

test('loader down', () => {
    const previousState = { todos: [], loader: true, errorMessage: '', search_value: ''}
    expect(itemsEntitiesReducer(previousState, loaderDownAction())).toEqual(initState)
})

test('get empty list - test 0', () => {
  const previousState = []
  expect(itemsEntitiesReducer(previousState, getTodoListAction([]))).toEqual(getEmptyList)
})

test('add single todo - test 1', () => {
    const previousState = { todos: [], loader: false, errorMessage: '', search_value: ''}
    expect(itemsEntitiesReducer(previousState, addTodoAction(addSingleItem))).toEqual(arrTest1)
})

test('add multiple todos - test 2', () => {
    const previousState = arrTest1
    expect(itemsEntitiesReducer(previousState, addTodoAction(multipleTodos))).toEqual(arrTest2)
})

test('delete second item todos (id:2) - test 3', () => {
    const previousState = arrTest2
    expect(itemsEntitiesReducer(previousState, deleteTodoAction(deleteItem))).toEqual(arrTest3)
})

test('edit value - test 4 (id:1) - test 4', () => {
    const previousState = arrTest3
    expect(itemsEntitiesReducer(previousState, editTodoAction(editedItem))).toEqual(arrTest4)
})

test('edit value - test 5 (id:3) - test 5', () => {
    const previousState = arrTest4
    expect(itemsEntitiesReducer(previousState, editTodoAction(editedCheckItem))).toEqual(arrTest5)
})

test('get todos - test 6', () => {
    const previousState = initState
    expect(itemsEntitiesReducer(previousState, getTodoListAction(arrTest5.todos))).toEqual(arrTest5)
})

test('search contains all -test 7', () => {
    const previousState = arrTest5
    expect(itemsEntitiesReducer(previousState, searchAction("pok3"))).toEqual(
        {...arrTest5,search_value: 'pok3'}
    )
})

test('clear all -test 8', () => {
    const previousState = arrTest5
    expect(itemsEntitiesReducer(previousState, clearAllAction())).toEqual(
        {...arrTest5,todos: []}
    )
})
