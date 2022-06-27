import './App.css';
import {useState, useEffect} from "react"
import ItemClient from './server-api/item-client';

function App() {

  const [todos, setTodos] = useState([])
  useEffect(() => {
    getTodos()
  },[])

  const itemClient = new ItemClient();

  const getTodos = async() => {
    const items = await itemClient.getTodoList()
    console.log(items)
    setTodos(items);
  }

  const addTodo = async(value) => {
    await itemClient.addTodo(value);
    getTodos()
  }

  const deleteTodo = async(id) => {
    await itemClient.deleteTodo(id);
    getTodos()
  }

  const editTodo = async(id, value, status) => {
    await itemClient.editTodo(id, value, status)
    getTodos()
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
