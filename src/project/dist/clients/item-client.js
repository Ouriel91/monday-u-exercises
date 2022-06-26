// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const SERVER_URL = 'http://localhost:8080/todo'
export default class ItemClient {

    async getTodoList(query = ""){
        const response = await fetch(`${SERVER_URL}${query}`)
        const data = await response.json()

        return data
    }

    async addTodo(value) {
        await fetch(SERVER_URL, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value})
        })
    }

    async deleteTodo(id){
        const response = await fetch(`${SERVER_URL}/${id}`, 
        {
            method: 'DELETE'
        })
        const data = await response.json()
        return data.title
    }
    
    async editTodo(id, value, status) {

        const response = await fetch(`${SERVER_URL}/${id}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value, status})
        })

        const data = await response.json()
        return data
    }    
}

