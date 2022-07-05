const PokemonClient =  require("../../clients/pokemon-client.js")
const handleAddSingleOrMultiPokemonsTodo = require('./pokemon-helpers.js')
const {Todos}  = require('../../db/models')
const addTodoData = require('../utils/add-todo-data.js')
const inputValidator  = require("../utils/input-validation.js")
const sanitize = require('../utils/sanitize.js')
const sortObj = require('../utils/consts.js')
const errorHandler = require('../utils/error-handling.js')

module.exports = class ItemManager {
    constructor(){
        this.pokemonClient = new PokemonClient()
    }

    async addTodo(enterValue){
        const trimValue = sanitize(enterValue)
        if(trimValue === "") {
            errorHandler("add todo", 400)
        }

        return await this.handleInputToAdd(trimValue)
    }

    async handleInputToAdd(trimValue){
    
        if(inputValidator(trimValue)) {
            return await handleAddSingleOrMultiPokemonsTodo(this.pokemonClient, trimValue)
        }
        else{ //noraml todo
            return await addTodoData(trimValue, false, null)
        }
    }

    async deleteTodo(id) {
        const removedTodo = await Todos.findOne({where:{id}})

        if(!removedTodo) {
            errorHandler("delete", 404)
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
            errorHandler("edit value", 404)
        }

        todo.status = status  
        todo.done_timestamp = new Date().getTime();
        await todo.save()

        return todo
    }

    async editDataInIndex(value, id){
        const todo = await Todos.findOne({where:{id}})

        if(!todo) {
            errorHandler("edit check", 404)
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
