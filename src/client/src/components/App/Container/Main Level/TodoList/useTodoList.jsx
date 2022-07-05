import TodoItem from '../TodoItem/TodoItem'

function useTodoList(todos) {
    const renderItems = todos.map(todo => <TodoItem 
        key={todo.id} 
        todo={todo}/>)  

  return {renderItems}
}

export default useTodoList