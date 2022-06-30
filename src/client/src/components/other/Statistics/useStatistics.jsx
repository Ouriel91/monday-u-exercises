import ItemClient from '../../../server-api/item-client';
import {useState} from 'react'


function useStatistics() {

    const [doneTodos, setDoneTodos] = useState(0)
    const [undoneTodos, setUndoneTodos] = useState(0)

    const itemClient = new ItemClient();
    const data = {
        labels: ['Undone','Done'],
        datasets: [
          {
            label: '# of Tasks',
            data: [undoneTodos, doneTodos],
            backgroundColor: [
              'red',
              'green',
            ],
            borderWidth: 1,
          },
        ],
      }

    const handleStatistics = async() => {
        const items = await itemClient.getTodoList();
        
        let done = 0
        items.forEach((item) => {
            if(item.status === true) {
                done++
            }
        })

        setUndoneTodos(items.length - done)
        setDoneTodos(done)
    }

    return {handleStatistics, data}
}

export default useStatistics