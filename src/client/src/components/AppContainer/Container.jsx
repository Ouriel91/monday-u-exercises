import useContainer from './useContainer'
import styles from './Container.module.css';
import Top from '../Top/Top'
import Loader from '../Loader/Loader'
import Input from '../Input/Input'
import EmptyTodosShow from '../EmptyTodosShow/EmptyTodosShow'
import TodoList from '../TodoList/TodoList'
import Bottom from '../Bottom/Bottom'
import PropTypes from "prop-types";

function Container() {

    const {
        addTodo, 
        editTodo, 
        deleteTodo, 
        getTodos, 
        todos = [],
        loader = false,
    } = useContainer();

    return (
        <div className={styles.container}>
            <Top getTodos={getTodos}/>
            
            {loader ? <Loader /> : null}
            <Input addTodo={addTodo}/>
            {
            todos.length > 0 ? 
                <TodoList 
                    todos={todos}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}/> 
                : 
                <EmptyTodosShow />
            } 
            <Bottom length={todos.length} deleteTodo={deleteTodo}/>
        </div>
    )
}

Container.propTypes = {
    loader: PropTypes.bool,
    todos: PropTypes.array,
    addTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func,
    getTodos: PropTypes.func,
}

export default Container