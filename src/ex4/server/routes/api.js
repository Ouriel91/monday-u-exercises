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
    
    if(!todo){
        res.status(400).send()
        return
    }
    
    try{
        await itemManager.addTodo(todo)
        res.status(201).json(todo);
    }
    catch(error){
        console.log(error)
    }
})

todoRouter.delete("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id)
    const deletedTodo = itemManager.deleteTodo(id)
    if(deletedTodo === null){
       return res.status(404).send()
    }

    res.status(200).json(deletedTodo)
})

todoRouter.put("/:id", (req, res) => {
    const {todo} = req.body
    const id = Number.parseInt(req.params.id)
    const editTodo = itemManager.editDataInIndex(todo, id)

    if(editTodo === null){
        return res.status(404).send()
     }
 
     res.status(200).send()
})

todoRouter.get('/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    const dataInIndex = itemManager.getDataInIndex(id)

    if(dataInIndex === null){
        return res.status(404).send()
     }
 
     res.status(200).send()
})

export default todoRouter;