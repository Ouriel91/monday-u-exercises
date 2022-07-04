const {Todos}  = require('../../db/models')
const generateUniqueId = require('../utils/generate-unique-id')
const addTodoData = require('../utils/add-todo-data.js')
const sanitize = require('../utils/sanitize.js')

module.exports = async function handleAddSingleOrMultiPokemonsTodo(pokemonClient, enterValue){

    if(enterValue.includes(",")){
        const split = enterValue.split(",")
        const pokemonArr = []

        for(let i = 0; i < split.length; i++){
            pokemonArr.push(pokemonClient.fetchMulti(sanitize(split[i])))
        }
        await handleAddMultiPokemonsTodo(pokemonClient, pokemonArr)
    }
    else {
        await handleAddSinglePokemonTodo(pokemonClient, enterValue)
    }
}

async function handleAddMultiPokemonsTodo(pokemonClient, pokemonArr){

    return Promise.all(pokemonArr)
        .then(async (response) => {
            for(let i = 0; i < response.length; i++){
                await addMultiplePokemonsTodo(response[i], pokemonClient)
            }
    }).catch(async(error) => {
        console.log(error)
        await addFailToLoadPokemonsTodo(pokemonArr)
    })
}

async function addMultiplePokemonsTodo(res , pokemonClient) {
    const types = pokemonClient.getTypes(res)
    const dataRetrieved = pokemonClient.returnPokemonData(res, types)
    const {value, isPokemon, imagePokemonPath} = dataRetrieved
    await addTodoData(value, isPokemon, imagePokemonPath)
}

async function addFailToLoadPokemonsTodo(enterValue) {
    const value = `failed to fetch pokemon with this input: ${enterValue}`
    await addTodoData(value, false, null)
}

async function handleAddSinglePokemonTodo(pokemonClient, enterValue){
    
    const dataRetrieved = await pokemonClient.fetchSingle(enterValue)
    if(dataRetrieved){
        const {value, isPokemon, imagePokemonPath} = dataRetrieved
        await addTodoData(value, isPokemon, imagePokemonPath)
    }
    else {
        await addFailToLoadPokemonsTodo(enterValue)
    }   
}
