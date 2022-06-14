// Define your endpoints here (this is your "controller file")
import express from 'express';
import ItemManager from '../services/item-manager.js'

const todoRouter = express.Router();
const itemManager = new ItemManager();

todoRouter.get('/', (req, res) => {
    const data = itemManager.getTodoList()
    res.status(200).json(data);
})

todoRouter.post("/", async(req, res) => {
    const {todo} = req.body
    let error = new Error()
    
    if(!todo){
        error.statusCode = 400
        error.message = "Invalid todo, todo is null"
        throw error
    }
    
    try{
        await itemManager.addTodo(todo)
        res.status(201).json(todo);
    }
    catch(error){
        error.statusCode = 400
        error.message = "failed to add todo"
        throw error
    }
})

todoRouter.delete("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id)
    const deletedTodo = itemManager.deleteTodo(id)
    if(deletedTodo === null){
        let error = new Error()
        error.statusCode = 404
        error.message = "Invalid index to delete item"
        throw error
    }

    res.status(200).json(deletedTodo)
})

todoRouter.put("/:id", (req, res) => {
    const {todo} = req.body
    const id = Number.parseInt(req.params.id)
    const editTodo = itemManager.editDataInIndex(todo, id)

    if(editTodo === null){
        let error = new Error()
        error.statusCode = 404
        error.message = "Invalid index to update item"
        throw error
     }
 
     res.status(200).send()
})

todoRouter.get('/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    const dataInIndex = itemManager.getDataInIndex(id)

    if(dataInIndex === null){
        let error = new Error()
        error.statusCode = 404
        error.message = "Invalid index to get single item"
        throw error
    }
 
    res.status(200).send()
})

todoRouter.get('/clear', (req, res) => {
    console.log("clear routes")
    /* 
    itemManager.clearAllTodos()
    const data = itemManager.getTodoList()
    res.status(200).json(data); */
})

export default todoRouter;