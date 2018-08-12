import axios from 'axios';
import chartData from '../data/chart.json';

axios.defaults.baseURL = 'http://localhost:8011';


export default {
  fetchChartInfoServer(startDate, endDate) {
    return new Promise((resolve, reject) => {
      let chartInfoUrl = '/chartinfo';
      if (startDate) chartInfoUrl += `?from=${startDate}`;
      if (startDate && endDate) chartInfoUrl += `&to=${endDate}`;
      axios.get(chartInfoUrl).then(({ data }) => {
        resolve(data);
      }).catch(reject);
    });
  },
  fetchChartInfo() {
    return new Promise((resolve) => {
      resolve(chartData);
    });
  },
};
