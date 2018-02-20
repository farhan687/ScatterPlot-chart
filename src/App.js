import React, { Component } from 'react';
import './App.css';
import dataService from './helper/dataService';
import Chart from './components/Chart';
import RangeFilter from './components/RangeFilter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartInfo: null,
      error: null,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = (startDate = null, endDate = null) => {
    dataService.fetchChartInfo(startDate, endDate).then((chartInfo) => {
      this.setState({ chartInfo });
    }).catch((error) => {
      this.setState({ error });
    });
  }
  render() {
    const { chartInfo, error } = this.state;
    return (
      <div className="app">
        <div className="card">
          <header className="app-header">
            ScatterPlot Chart
          </header>
          {
            error || !chartInfo ? (<div className="app-error">{JSON.stringify(error)}</div>) : (
              <main className="app-main">
                <section className="app-chart">
                  <RangeFilter onRangeSelect={this.fetchData} />
                  <Chart
                    data={chartInfo.data}
                    colors={chartInfo.colors}
                  />
                </section>
              </main>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
