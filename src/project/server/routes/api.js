// Define your endpoints here (this is your "controller file")
import express from 'express';
import ItemManager from '../services/item-manager.js'

const todoRouter = express.Router();
const itemManager = new ItemManager();

todoRouter.get('/', (req, res) => {
    const {sort, filter} = req.query;

    const ATOZ = 'atoz'
    const ZTOA = 'ztoa'
    const DTOU = 'dtou'
    const UTOD = 'utod'
    
    if(sort){
        if(sort === ATOZ){
            itemManager.orderDataAlphabetically()
        }else if (sort === ZTOA){
            itemManager.orderDataAlphabeticallyReverse()
        }
        else if (sort === DTOU){
            itemManager.orderDoneToUnDone()
        }
        else if (sort === UTOD){
            itemManager.orderUnDoneToDone()
        }
        
        res.status(200).json({});
        return
    }

    if(filter){

        const data = itemManager.getTodoList()
        let filteteredData = [];

        if(filter === 'checked'){
            filteteredData = data.filter(t => t.done === true);
        }else{
            filteteredData = data.filter(t => t.done === false);
        }

        res.status(200).json(filteteredData);
        return
    }
    
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

todoRouter.delete('/all', (req, res) => {
    itemManager.clearAllTodos()
    res.status(200).json({});
})

todoRouter.delete("/:id", (req, res) => {
    const id = req.params.id

    try{
        const deletedTodo = itemManager.deleteTodo(id)
        res.status(200).json(deletedTodo)
    }catch(err){
        res.status(404).json({error: err.toString()})
    }
})

todoRouter.put("/:id", (req, res) => {

    const id = req.params.id
    const {status, todo} = req.body

    if(status !== null){
        
        if(status){
            try{
                itemManager.checkTodo(id)
                res.status(200).json({})
            }catch(err){
                res.status(404).json({error: err.toString()})
            }
        }
        else{
            try{
                itemManager.uncheckTodo(id)
                res.status(200).json({})
            }catch(err){
                res.status(404).json({error: err.toString()})
            }
        }
        return 
    }

    if(todo !== null){
        try{
            const editTodo = itemManager.editDataInIndex(todo, id)
            res.status(200).json(editTodo)
        }catch (err){
            res.status(404).json({error: err.toString()})
        }
    }
  
})


export default todoRouter;