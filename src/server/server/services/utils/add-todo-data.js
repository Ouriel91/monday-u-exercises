const generateUniqueId = require('./generate-unique-id')
const {Todos}  = require('../../db/models')

module.exports = async function addTodoData(value, isPokemon, imagePokemonPath) {
    const id = generateUniqueId()

    const newTodo = await Todos.create({itemId: id, itemName: value, status:false, isPokemon, imagePokemonPath})
    return newTodo
}