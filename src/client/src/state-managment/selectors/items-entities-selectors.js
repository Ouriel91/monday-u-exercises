export const todos = state => {
    if(state.itemsEntities.search_value !== ''){
        return state.itemsEntities.todos.filter(todo => todo.itemName.includes(state.itemsEntities.search_value))
    }
    return state.itemsEntities.todos
};
export const loader = state => state.itemsEntities.loader;
export const todosLength = state => state.itemsEntities.todos.length;
export const errorMessage = state => state.itemsEntities.errorMessage;
export const searchValue = state => state.itemsEntities.search_value