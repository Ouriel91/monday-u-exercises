import TodoItem from '../TodoItem/TodoItem'

function useTodoList(todos, addTodo, deleteTodo, editTodo) {

    const renderItems = todos.map(todo => <TodoItem 
        key={todo.id} 
        todo={todo}
        addTodo={addTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}/>)  

  return {renderItems}
}

export default useTodoList