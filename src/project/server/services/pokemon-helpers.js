const {Todos}  = require('../db/models')
const generateUniqueId = require('./generate-unique-id')

module.exports = async function handleAddSingleOrMultiPokemonsTodo(pokemonClient, enterValue){

    if(enterValue.includes(",")){
        await handleAddMultiPokemonsTodo(pokemonClient, enterValue)
    }
    else {
        await handleAddSinglePokemonTodo(pokemonClient, enterValue)
    }
}

async function handleAddMultiPokemonsTodo(pokemonClient, enterValue){

    const split = enterValue.split(",")
    const pokemonArr = []

    for(let i = 0; i < split.length; i++){
        pokemonArr.push(pokemonClient.fetchMulti(sanitize(split[i])))
    }

    return Promise.all(pokemonArr)
        .then(async (response) => {
            for(let i = 0; i < response.length; i++){
                await addMultiplePokemonsTodo(response[i], pokemonClient)
            }
    }).catch(async(error) => {
        console.log(error)
        await addFailToLoadPokemonsTodo(enterValue)
    })
}

async function addMultiplePokemonsTodo(res , pokemonClient) {
    const types = pokemonClient.getTypes(res)
    const dataRetrieved = pokemonClient.returnPokemonData(res, types)
    const {value, isPokemon, imagePokemonPath} = dataRetrieved
    await addTodoParse(value, isPokemon, imagePokemonPath)
}

async function addTodoParse(value, isPokemon, imagePokemonPath){
    const id = generateUniqueId()
    
    await Todos.create({itemId: id, itemName: value, status:false, imagePokemonPath, isPokemon})
}

async function addFailToLoadPokemonsTodo(enterValue) {
    const isPokemon = false
    const imagePokemonPath = null
    const value = `failed to fetch pokemon with this input: ${enterValue}`
    await addTodoParse(value, isPokemon, imagePokemonPath)
}


async function handleAddSinglePokemonTodo(pokemonClient, enterValue){
    
    const dataRetrieved = await pokemonClient.fetchSingle(enterValue)
    if(dataRetrieved){
        const {value, isPokemon, imagePokemonPath} = dataRetrieved
        await addTodoParse(value, isPokemon, imagePokemonPath)
    }
    else {
        await addFailToLoadPokemonsTodo(enterValue)
    }   
}

function sanitize(value) {
    return value.replace(/^\s+|\s+$/g,"");
}