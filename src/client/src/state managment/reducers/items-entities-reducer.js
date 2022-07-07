import actionTypes from "../actions/constants";

const initialState = {todos :[], loader: false, errorMessage: '', search_value: ''};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_TODOLIST:
      return {...state, todos: action.todos, todos_cloned: action.todos}
    case actionTypes.LOADER_UP:
      return {...state, loader: true} 
    case actionTypes.LOADER_DOWN:
      return {...state, loader: false} 
    case actionTypes.ADD_TODO:
      let cpyTodosAdd
      if(action.item.length){ //multiple items added
        cpyTodosAdd = [...state.todos, ...action.item]
      }
      else{ //single add
        cpyTodosAdd = [...state.todos, action.item]
      }
      
      return {...state, todos: cpyTodosAdd, todos_cloned: cpyTodosAdd}
    case actionTypes.DELETE_TODO:
      const cpyTodosDelete = [...state.todos]
      const deleteIndex = cpyTodosDelete.findIndex(item => action.item.id === item.id);
      cpyTodosDelete.splice(deleteIndex, 1)
      return {...state, todos: cpyTodosDelete, todos_cloned: cpyTodosDelete}
    case actionTypes.EDIT_TODO:
      const cpyTodosEdit = [...state.todos]
      const editedIndex = cpyTodosEdit.findIndex(item => action.item.id === item.id);
      cpyTodosEdit[editedIndex] = action.item;
      return {...state, todos: cpyTodosEdit, todos_cloned: cpyTodosEdit}
    case actionTypes.CLEAR_ALL:
      return {...state, todos:[], todos_cloned: []}
    case actionTypes.SET_ERROR:
      return {...state, errorMessage: action.message, loader: false}
    case actionTypes.SEARCH:
      return {...state, search_value: action.value}
    default:
      return state;
  }
};

export default itemsEntitiesReducer;
