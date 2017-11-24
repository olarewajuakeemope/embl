import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EMBL Publications Finder</h1>
          <p className="App-intro">
            <ul>
  <li>
  <TextField
              hintText="Enter search term"
              name="fullname"
              id="search"
              onChange={this.onChange}
              style={{marginRight: '1em'}}
            /></li>
  <li>
  <DatePicker
              name="startDate"
              onChange={this.handleStartDate}
              hintText="Start Date"
              style={{marginRight: '1em'}}
            /></li>
  <li>
  <DatePicker
              name="endDate"
              onChange={this.handleEndDate}
              hintText="End Date"
            /></li>
</ul>
            <br />
          </p>
          <div>
            <RaisedButton
              label="Primary"
              backgroundColor="rgb(117, 170, 81)"
              labelColor="white"
            /></div>
        </header>
      </div>
    );
  }
}

export default App;
