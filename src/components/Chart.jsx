import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import THEME from '../utils/chartTheme';

const Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);


class Chart extends Component {
  componentDidMount() {
    this.renderChart(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.renderChart(nextProps);
  }

  renderChart = (props) => {
    const { publications, query } = props;
    const { term, startDate, endDate } = query;

    const chartData = publications.map((item) => {
      const { hitCount, resultList, date } = item;
      if (hitCount === 0) {
        return {
          hitCount: 0,
          source: 'N/A',
          title: 'N/A',
          journalTitle: 'N/A',
          pubYear: date,
          firstPublicationDate: 'N/A',
          citedByCount: 0,
        };
      }

      const publication = resultList.result[0];
      const {
        source,
        title,
        journalTitle,
        firstPublicationDate,
        citedByCount,
      } = publication;

      return {
        hitCount,
        source,
        title,
        journalTitle,
        pubYear: date,
        firstPublicationDate,
        citedByCount,
      };
    });

    const xAxisCategories = chartData.map(item => item.pubYear);
    const yAxisCategories = chartData.map((item) => {
      const {
        hitCount,
        source,
        title,
        journalTitle,
        firstPublicationDate,
        citedByCount,
      } = item;

      return {
        y: hitCount,
        source,
        title,
        name: journalTitle,
        firstPublicationDate,
        max: citedByCount,
      };
    });

    // Create the chart
    Highcharts.theme = THEME;

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    Highcharts.chart('container', {
      chart: {
        type: 'column',
      },
      title: {
        text: 'EMBL Publications Statistics',
      },
      subtitle: {
        text: `${term.toUpperCase()} Search: From
          ${startDate.toDateString()} 
          To ${endDate.toDateString()}`,
      },
      xAxis: {
        categories: xAxisCategories,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Publications',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px"><b>{point.y} Publications this year</b></span><table>' +
          '<p style="font-size:10px">Most Cited Publication</p><table>',
        pointFormat: '<tr><td style="color:white;padding:0">Journal: </td>' +
          '<td style="padding:0;color:#999999;"><b>{point.name}</b></td></tr>' +

          '<tr><td style="color:white;padding:0">Title: </td>' +
          '<td style="padding:0;"><b>{point.title}</b></td></tr>' +

          '<tr><td style="color:white;padding:0">Source: </td>' +
          '<td style="padding:0;color:#999999;"><b>{point.source}</b></td></tr>' +

          '<tr><td style="color:white;padding:0">First Published: </td>' +
          '<td style="padding:0"><b>{point.firstPublicationDate}</b></td></tr>' +

          '<tr><td style="color:white;padding:0">Citations: </td>' +
          '<td style="padding:0;color:#999999;"><b>{point.max}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [{
        name: 'Years',
        data: yAxisCategories,
      }],
    });
  }

  render() {
    return (
      <div>
        <SearchForm isNavbar />
        <div id="container" />
      </div>
    );
  }
}

Chart.propTypes = {
  publications: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
};

function select(store) {
  const { publications, query } = store.managePublications;
  return {
    publications,
    query,
  };
}

export default connect(select)(Chart);
