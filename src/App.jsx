import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchForm from './components/SearchForm';
import Chart from './components/Chart';
import logo from './resources/img/logo.png';
import './resources/styles/App.css';

const App = ({ publications }) => {
  if (publications[0] !== undefined) {
    return <Chart />;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">EMBL Publications Statistics</h1>
        <SearchForm
          pClass="App-intro"
        />
      </header>
    </div>
  );
};

App.propTypes = {
  publications: PropTypes.array.isRequired,
};

function select(store) {
  const { publications } = store.managePublications;
  return {
    publications,
  };
}

export default connect(select)(App);
