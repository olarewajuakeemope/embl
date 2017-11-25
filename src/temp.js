import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);


class App extends Component {
  componentDidMount() {
    // Create the chart

  Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
       '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
       backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
             [0, '#2a2a2b'],
             [1, '#3e3e40']
          ]
       },
       style: {
          fontFamily: '\'Unica One\', sans-serif'
       },
       plotBorderColor: '#606063'
    },
    title: {
       style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
       }
    },
    subtitle: {
       style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
       }
    },
    xAxis: {
       gridLineColor: '#707073',
       labels: {
          style: {
             color: '#E0E0E3'
          }
       },
       lineColor: '#707073',
       minorGridLineColor: '#505053',
       tickColor: '#707073',
       title: {
          style: {
             color: '#A0A0A3'
 
          }
       }
    },
    yAxis: {
       gridLineColor: '#707073',
       labels: {
          style: {
             color: '#E0E0E3'
          }
       },
       lineColor: '#707073',
       minorGridLineColor: '#505053',
       tickColor: '#707073',
       tickWidth: 1,
       title: {
          style: {
             color: '#A0A0A3'
          }
       }
    },
    tooltip: {
       backgroundColor: 'rgba(0, 0, 0, 0.85)',
       style: {
          color: '#F0F0F0'
       }
    },
    plotOptions: {
       series: {
          dataLabels: {
             color: '#B0B0B3'
          },
          marker: {
             lineColor: '#333'
          }
       },
       boxplot: {
          fillColor: '#505053'
       },
       candlestick: {
          lineColor: 'white'
       },
       errorbar: {
          color: 'white'
       }
    },
    legend: {
       itemStyle: {
          color: '#E0E0E3'
       },
       itemHoverStyle: {
          color: '#FFF'
       },
       itemHiddenStyle: {
          color: '#606063'
       }
    },
    credits: {
       style: {
          color: '#666'
       }
    },
    labels: {
       style: {
          color: '#707073'
       }
    },
 
    drilldown: {
       activeAxisLabelStyle: {
          color: '#F0F0F3'
       },
       activeDataLabelStyle: {
          color: '#F0F0F3'
       }
    },
 
    navigation: {
       buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
             fill: '#505053'
          }
       }
    },
 
    // scroll charts
    rangeSelector: {
       buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
             color: '#CCC'
          },
          states: {
             hover: {
                fill: '#707073',
                stroke: '#000000',
                style: {
                   color: 'white'
                }
             },
             select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                   color: 'white'
                }
             }
          }
       },
       inputBoxBorderColor: '#505053',
       inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
       },
       labelStyle: {
          color: 'silver'
       }
    },
 
    navigator: {
       handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
       },
       outlineColor: '#CCC',
       maskFill: 'rgba(255,255,255,0.1)',
       series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
       },
       xAxis: {
          gridLineColor: '#505053'
       }
    },
 
    scrollbar: {
       barBackgroundColor: '#808083',
       barBorderColor: '#808083',
       buttonArrowColor: '#CCC',
       buttonBackgroundColor: '#606063',
       buttonBorderColor: '#606063',
       rifleColor: '#FFF',
       trackBackgroundColor: '#404043',
       trackBorderColor: '#404043'
    },
 
    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
 };
 
 // Apply the theme
 Highcharts.setOptions(Highcharts.theme);

 Highcharts.chart('container', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Monthly Average Rainfall'
  },
  subtitle: {
      text: 'Source: WorldClimate.com'
  },
  xAxis: {
      categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Rainfall (mm)'
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'Tokyo',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

  }, {
      name: 'New York',
      data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

  }, {
      name: 'London',
      data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

  }, {
      name: 'Berlin',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

  }]
});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="container" />
      </div>
    );
  }
}

export default App;
