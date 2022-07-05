import actionTypes from "../actions/constants";

const initialState = {todos :[], loader: false};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_TODOLIST:
      return {...state, todos: action.todos}
    case actionTypes.LOADER_UP:
      return {...state, loader: true} 
    case actionTypes.LOADER_DOWN:
      return {...state, loader: false} 
    case actionTypes.ADD_TODO:
      const cpyTodosAdd = [...state.todos]
      cpyTodosAdd.push(action.item)
      return {...state, todo: cpyTodosAdd}
    case actionTypes.DELETE_TODO:
      const cpyTodosDelete = [...state.todos]
      const deleteIndex = cpyTodosDelete.findIndex(item => action.item.id === item.id);
      cpyTodosDelete.splice(deleteIndex, 1)
      return {...state, todo: cpyTodosDelete}
    case actionTypes.EDIT_TODO:
      const cpyTodosEdit = [...state.todos]
      const editedIndex = cpyTodosEdit.findIndex(item => action.item.id === item.id);
      cpyTodosEdit[editedIndex] = action.item;
      return {...state, todo: cpyTodosEdit}

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
