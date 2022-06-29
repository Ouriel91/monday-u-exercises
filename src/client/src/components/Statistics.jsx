import React from 'react'
import ItemClient from '../server-api/item-client';
import {useState} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {

    const [doneTodos, setDoneTodos] = useState(0)
    const [undoneTodos, setUndoneTodos] = useState(0)

    const itemClient = new ItemClient();
    const data = {
        labels: ['Undone','Done'],
        datasets: [
          {
            label: '# of Votes',
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
    
    handleStatistics()

    return (
        <div>
            <div style={{width: "200px", height: "200px"}}><Pie data={data} /></div>
        </div>
    )
}

export default Statistics