import actionTypes from "../actions/constants";

const initialState = {todos :[], loader: false};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_TODOLIST:
      state.todos = action.todos;
      break;
    case actionTypes.LOADER_UP:
      state.loader = true;
      break;   
    case actionTypes.LOADER_DOWN:
      state.loader = false;
      break;
    case actionTypes.ADD_TODO:
      state.todos.push(action.item)
      break;
    case actionTypes.DELETE_TODO:
      const deleteIndex = state.todos.findIndex(item => action.item.id === item.id);
      state.todos.splice(deleteIndex, 1)
      break;
    case actionTypes.EDIT_TODO:
      const editedIndex = state.todos.findIndex(item => action.item.id === item.id);
      state.todos[editedIndex] = action.item;
      break;

    default:
      return state;
  }

  return state;
};

export default itemsEntitiesReducer;
