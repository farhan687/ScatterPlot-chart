const express = require('express');
const cors = require('cors');
const chartInfo = require('./data/chart');

const app = express();
app.use(cors());

/* GET: chartinfo
  Query Params: from and to
  from: startDate
  to: endDate
*/
app.get('/chartinfo', (req, res) => {
  const { from = null, to = null } = req.query;
  let chartData = [...chartInfo.data];
  if (from) {
    chartData = chartData.filter(({ start_time }) => {
      let shouldIncludeDataPoint = true;
      shouldIncludeDataPoint = !!(Date.parse(start_time) >= from);
      if (!shouldIncludeDataPoint) return false;
      if (to) shouldIncludeDataPoint = !!(Date.parse(start_time) <= to);
      return shouldIncludeDataPoint;
    });
  }
  res.send({
    colors: chartInfo.colors,
    data: chartData,
  });
});

app.listen(8011, () => console.log('Saucelabs test App listening on port 8011!'));

