// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
export default class ItemClient {
    async getTodoList(){
        const response = await fetch('http://localhost:8080/todo/')
        const data = await response.json()

        return data
    }

    async deleteTodo(index){
        const response = await fetch(`http://localhost:8080/${index}`, {method: "delete"})
        const data = await response.json()
    }
}