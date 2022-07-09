import useContainer from './useContainer'
import styles from './Container.module.css';
import Header from './Header/Header/Header'
import Loader from './Main/Loader/Loader'
import TodoInput from './Main/TodoInput/TodoInput'
import EmptyTodosShow from './Main/EmptyTodosShow/EmptyTodosShow'
import TodoList from './Main/TodoList/TodoList'
import Footer from './Footer/Footer/Footer'
import PropTypes from "prop-types";

function Container() {

    const {
        addTodo, 
        editTodo, 
        deleteTodo, 
        getTodos, 
        todos = [],
        isLoading = false,
    } = useContainer();

    return (
        <div className={styles.container}>
            <Header getTodos={getTodos}/>
            
            {isLoading ? <Loader /> : null}
            <TodoInput addTodo={addTodo}/>
            {
            todos.length > 0 ? 
                <TodoList 
                    todos={todos}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}/> 
                : 
                <EmptyTodosShow />
            } 
            <Footer todosLength={todos.length} deleteTodo={deleteTodo}/>
        </div>
    )
}

Container.propTypes = {
    isLoading: PropTypes.bool,
    todos: PropTypes.array,
    addTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func,
    getTodos: PropTypes.func,
}

export default Container