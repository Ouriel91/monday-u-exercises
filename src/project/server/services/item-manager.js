const PokemonClient =  require("../clients/pokemon-client.js")
const handleAddSingleOrMultiPokemonsTodo = require('./pokemon-helpers.js')
const {Todos}  = require('../db/models')
const addTodoData = require('./add-todo-data.js')
const inputValidator  = require("./input-validation.js")
const sanitize = require('./sanitize.js')
const sortObj = require('./consts.js')

module.exports = class ItemManager {
    constructor(main){
        this.pokemonClient = new PokemonClient()
        this.main = main;
    }

    async addTodo(enterValue){
        const trimValue = sanitize(enterValue)
        if(trimValue === "") {
            const error = new Error()
            error.statusCode = 400
            error.message = "failed to add todo"
            throw error
        }

        await this.handleInputToAdd(trimValue)
    }

    async handleInputToAdd(trimValue){
    
        if(inputValidator(trimValue)) {
            await handleAddSingleOrMultiPokemonsTodo(this.pokemonClient, trimValue)
        }
        else{ //noraml todo
            await addTodoData(trimValue, false, null)
        }
    }

    async deleteTodo(id) {
        const removedTodo = await Todos.findOne({where:{id}})

        if(!removedTodo) {
            const error = new Error()
            error.statusCode = 404
            error.message = "Invalid index to delete item"
            throw error
        };
        await removedTodo.destroy()

        return removedTodo
    }

    async clearAllTodos() {
        await Todos.destroy({
            where: {},
            truncate: true
        })
    }

    async orderData(sort) {
        return await Todos.findAll({
            order:[
                [sortObj[sort].field, sortObj[sort].order]
            ]
        })
    }

    async checkUncheckTodo(id, status) {
        const todo = await Todos.findOne({where:{id}})
        if(!todo) {
            const error = new Error()
            error.statusCode = 404
            error.message = "Invalid index to edit item"
            throw error
        }
        todo.status = status  
        todo.done_timestamp = new Date().getTime();
        await todo.save()

        return todo
    }

    async editDataInIndex(value, id){
        const todo = await Todos.findOne({where:{id}})
        if(!todo) {
            const error = new Error()
            error.statusCode = 404
            error.message = "Invalid index to edit item"
            throw error
        }
        todo.itemName = value  
        await todo.save()
        
        return todo
    }

    async filterData(filter){
        const status = filter === 'checked'
    
        return await Todos.findAll({
            where:{status}
        })
    }

    todoListSize() {
        return this.getTodoList().length
    }

    async getTodoList() {
        return await Todos.findAll()
    }
}
