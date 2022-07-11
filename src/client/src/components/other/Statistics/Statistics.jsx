import ItemClient from '../../../server-api/item-client';
import {useState} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from "prop-types";
import styles from "./Staitstics.module.css"

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {

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
            '#3171a8',
            '#8d5db3',
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
            <div className={styles.chart}>
              <Pie data={data}/>
            </div>
        </div>
    )
}

Statistics.propTypes = {
  data: PropTypes.object,
  handleStatistics: PropTypes.func
}

export default Statistics