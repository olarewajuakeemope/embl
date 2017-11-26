import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../resources/img/logo.png';
import dataValidators from '../utils/dataValidators';
import actions from '../actions/userActions';

const INITIAL_STATE = {
  loading: false,
  loadingText: 'Search',
  term: '',
  startDate: null,
  endDate: null,
  errors: {},
};

/**
 * Class to display search form
 * @export
 * @class SearchForm
 * @extends {Component}
 */
class SearchForm extends Component {
  state = INITIAL_STATE

  /**
   * Bind the value of the inputs to state
   * @method onChange
   * @param {any} e
   * @return {void}
   * @memberOf SearchForm
   */
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  handleStartDate = (event, date) => this.setState({
    startDate: date,
  });

  handleEndDate = (event, date) => this.setState({
    endDate: date,
  });

  /**
   * Validates useer's data before making
   * post request
   * @method validateData
   * @returns {boolean} -
   * @memberOf SearchForm
   */
  validateData = () => {
    const { errors, isValid } = dataValidators.searchForm(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return { errors, isValid };
  }

  /**
   * Submit the form
   * @method submitForm
   * @param {object} e
   * @return {void}
   * @memberOf SearchForm
   */
  submitForm = (e) => {
    e.preventDefault();
    this.setState({
      errors: {},
      loading: true,
      loadingText: 'Loading',
    });
    this.processForm();
  }

  processForm = async () => {
    const { errors, isValid } = await this.validateData();
    const { dispatch, fetching } = this.props;

    if (isValid) {
      await actions.fetchPublications(dispatch, this.state);
      const { fetchError } = await this.props;

      if (!fetching && !fetchError) {
        this.resetState();
      } else if (!fetching && fetchError) {
        window.alert(fetchError);
        this.setState({
          loading: false,
          loadingText: 'Search',
        });
      }
    } else {
      this.setState({
        errors,
        loading: false,
        loadingText: 'Search',
      });
    }
  }

  resetState = () => {
    this.setState(INITIAL_STATE);
  }

  render() {
    const { pClass, isNavbar } = this.props;
    const {
      errors,
      loading,
      loadingText,
      startDate,
      endDate,
      term,
    } = this.state;

    const startDateError = errors.startDate ? <p className="error text-danger">{errors.startDate}</p> : '';
    const endDateError = errors.endDate ? <p className="error text-danger">{errors.endDate}</p> : '';
    const appLogo = <img src={logo} className="App-logo navbar-logo" alt="logo" />;
    const submitButton = (
      <div>
        <RaisedButton
          disabled={loading}
          label={loadingText}
          onClick={this.submitForm}
          backgroundColor="rgb(117, 170, 81)"
          labelStyle={{ color: 'white' }}
        />
      </div>
    );

    return (
      <div>
        <p className={pClass}>
          <ul className={isNavbar && 'navbar'}>
            <li className={isNavbar && 'nav-logo'}>
              {isNavbar && appLogo}
            </li>
            <li className={isNavbar && 'form-item'}>
              <div className="search-text">
                <TextField
                  hintText="Enter search term"
                  name="term"
                  value={term}
                  errorText={errors.term}
                  onChange={this.onChange}
                />
              </div>
            </li>
            <li className={isNavbar && 'form-item'}>
              <div className="date">
                <DatePicker
                  name="startDate"
                  openToYearSelection
                  value={startDate}
                  onChange={this.handleStartDate}
                  hintText="Start Date"
                />
                {startDateError}
              </div>
            </li>
            <li className={isNavbar && 'form-item'}>
              <div className="date">
                <DatePicker
                  name="endDate"
                  openToYearSelection
                  value={endDate}
                  onChange={this.handleEndDate}
                  hintText="End Date"
                />
                {endDateError}
              </div>
            </li>
            <li className={isNavbar && 'form-item submit'}>
              {isNavbar && submitButton}
            </li>
          </ul>
          <br />
        </p>
        {!isNavbar && submitButton}
      </div>
    );
  }
}

SearchForm.defaultProps = {
  pClass: '',
  isNavbar: false,
};

SearchForm.propTypes = {
  pClass: PropTypes.string,
  fetchError: PropTypes.string.isRequired,
  isNavbar: PropTypes.bool,
};

function select(store) {
  const { error, fetching } = store.managePublications;
  return {
    fetchError: error,
    fetching,
  };
}

export default connect(select)(SearchForm);
