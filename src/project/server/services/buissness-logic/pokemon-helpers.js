const {Todos}  = require('../../db/models')
const addTodoData = require('../utils/add-todo-data.js')
const sanitize = require('../utils/sanitize.js')

module.exports = async function handleAddSingleOrMultiPokemonsTodo(pokemonClient, enterValue){

    if(enterValue.includes(",")){
        const split = enterValue.split(",")
        const pokemonArr = []

        for(let i = 0; i < split.length; i++){
            pokemonArr.push(pokemonClient.fetchMulti(sanitize(split[i])))
        }
        return await handleAddMultiPokemonsTodo(pokemonClient, pokemonArr)
    }
    else {
        return await handleAddSinglePokemonTodo(pokemonClient, enterValue)
    }
}

async function handleAddMultiPokemonsTodo(pokemonClient, pokemonArr){

    return Promise.all(pokemonArr)
        .then(async (response) => {
            for(let i = 0; i < response.length; i++){
                return await addMultiplePokemonsTodo(response[i], pokemonClient)
            }
    }).catch(async(error) => {
        console.log(error)
        return await addFailToLoadPokemonsTodo(pokemonArr)
    })
}

async function addMultiplePokemonsTodo(res , pokemonClient) {
    const types = pokemonClient.getTypes(res)
    const dataRetrieved = pokemonClient.returnPokemonData(res, types)
    const {value, isPokemon, imagePokemonPath} = dataRetrieved
    return await addTodoData(value, isPokemon, imagePokemonPath)
}

async function addFailToLoadPokemonsTodo(enterValue) {
    const value = `failed to fetch pokemon with this input: ${enterValue}`
    return await addTodoData(value, false, null)
}

async function handleAddSinglePokemonTodo(pokemonClient, enterValue){
    
    const dataRetrieved = await pokemonClient.fetchSingle(enterValue)
    if(dataRetrieved){
        const {value, isPokemon, imagePokemonPath} = dataRetrieved
        return await addTodoData(value, isPokemon, imagePokemonPath)
    }
    else {
        return await addFailToLoadPokemonsTodo(enterValue)
    }   
}