import useStatistics from './useStatistics'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from "prop-types";
import styles from "./Staitstics.module.css"

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {

    const {data = {}, handleStatistics} = useStatistics();
    
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