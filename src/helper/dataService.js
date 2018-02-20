import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8011';

export default {
  fetchChartInfo(startDate, endDate) {
    return new Promise((resolve, reject) => {
      let chartInfoUrl = '/chartinfo';
      if (startDate) chartInfoUrl += `?from=${startDate}`;
      if (startDate && endDate) chartInfoUrl += `&to=${endDate}`;
      axios.get(chartInfoUrl).then(({ data }) => {
        resolve(data);
      }).catch(reject);
    });
  },
};
