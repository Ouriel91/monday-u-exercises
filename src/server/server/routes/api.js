const express = require('express');
const ItemManager = require('../services/buissness-logic/item-manager.js')
const sortObj = require('../services/utils/consts.js')

const todoRouter = express.Router();
const itemManager = new ItemManager();

todoRouter.get('/', async(req, res) => {
    const {sort, filter} = req.query;
    
    let sortedList = [];

    if(sort){
        sortedList = await itemManager.orderData(sort)
    }
    else if(filter){
        sortedList = await itemManager.filterData(filter)
    }
    else{
        sortedList = await itemManager.getTodoList()
    }
    return res.status(200).json(sortedList);
})

todoRouter.post("/", async(req, res) => {
    const {todo} = req.body

    if(!todo){
        return res.status(400).json({error: "Invalid todo, todo is null"});
    }
    
    try{
        const addedTodo = await itemManager.addTodo(todo)
        return res.status(201).json(addedTodo);
    }
    catch(err){
        return res.status(error.statusCode || 500).json({error: err.toString()})
    }
})

todoRouter.delete('/delete-all', async(req, res) => {
    await itemManager.clearAllTodos()
    return res.status(200).json({});
})

todoRouter.delete("/:id", async(req, res) => {
    const id = req.params.id

    try{
        const deletedTodo = await itemManager.deleteTodo(id)
        return res.status(200).json(deletedTodo)
    }catch (err){
        return res.status(error.statusCode || 500).json({error: err.toString()})
    }

})

todoRouter.put("/:id", async(req, res) => {

    const id = req.params.id
    const {status, todo} = req.body

    try {
        if(status !== null){
            const editTodo = await itemManager.checkUncheckTodo(id, status)
            return res.status(200).json(editTodo)
        }
        if(todo !== null){
            const editTodo = await itemManager.editDataInIndex(todo, id)
            return res.status(200).json(editTodo)
        }
    }catch(err){
        return res.status(err.statusCode || 500).json({error: err.toString()})
    }
})

module.exports = todoRouter;