import React from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';

// Categorized Data and set colors for each data point
const prepareData = (data, colors) => {
  const categorizedData = {};
  data.forEach(({ start_time: startTime, status, duration }) => {
    categorizedData[status] = categorizedData[status] || [];
    const chartPoint = {
      x: Date.parse(startTime),
      y: duration,
      marker: {
        states: {
          select: {
            fillColor: colors[status],
            lineColor: '#e1e1e1',
            lineWidth: 4,
            radius: 12,
          },
        },
      },
    };
    categorizedData[status].push(chartPoint);
  });
  return Object.keys(colors).map(type => ({
    name: type,
    color: colors[type],
    data: categorizedData[type] || [],
  }));
};

// Highcharts config for scatter type chart
const getChartConfig = (data, colors) => ({
  chart: {
    type: 'scatter',
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  tooltip: { enabled: false },
  title: {
    text: null,
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      marker: {
        symbol: 'circle',
        radius: 6,
      },
    },
  },
  xAxis: {
    type: 'datetime',
    labels: {
      format: '{value:%b %e}',
    },
  },
  yAxis: {
    labels: {
      formatter() {
        return `${parseInt(this.value / 60, 10)} Min`;
      },
    },
    title: {
      text: null,
    },
  },
  series: prepareData(data, colors),
});

const Chart = (props) => {
  const { data, colors, dateRange } = props;
  const { startDate, endDate } = dateRange;
  const config = getChartConfig(data, colors, dateRange);
  if (startDate) config.xAxis.min = startDate;
  if (endDate) config.xAxis.max = endDate;
  return (
    <ReactHighcharts
      config={config}
      type="scatter"
      ref={(chart) => { this.currentChart = chart; }}
    />
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.object.isRequired,
  dateRange: PropTypes.object,
};

Chart.defaultProps = {
  dateRange: {},
};

export default Chart;
