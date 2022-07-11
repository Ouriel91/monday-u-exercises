const SERVER_URL = 'http://localhost:8080/todo'

export default class ItemClient {

    async getTodoList(query = ""){
        const response = await fetch(`${SERVER_URL}${query}`)
        const data = await response.json()

        return data
    }

    async addTodo(value) {
        const addTodoData = await fetch(SERVER_URL, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value})
        })
        const data = await addTodoData.json()

        return data
    }

    async deleteTodo(id){
        const response = await fetch(`${SERVER_URL}/${id}`, 
        {
            method: 'DELETE'
        })
        const data = await response.json()

        return data
    }

    async editTodo(id, value, status){
        const response = await fetch(`${SERVER_URL}/${id}`, 
        {
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

