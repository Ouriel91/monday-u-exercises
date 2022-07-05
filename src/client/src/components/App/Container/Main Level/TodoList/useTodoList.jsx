import TodoItem from '../TodoItem/TodoItem'

function useTodoList(todos, deleteTodo, editTodo) {
    const renderItems = todos.map(todo => <TodoItem 
        key={todo.id} 
        todo={todo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}/>)  

  return {renderItems}
}

export default useTodoList