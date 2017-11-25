
import axios from 'axios';
import types from './types';

const BASE_URL = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(KEYWORD:"';
const MIDDLE_URL = '")+AND+(FIRST_PDATE:[';
const TRAILING_URL = '])&format=json&cursorMark=*&pageSize=1&sort=CITED%20desc';

const NETWORK_ERROR_MESSAGE = 'Request failed with status code 404';
const NETWORK_ERROR_RESPONSE = 'Check your network connection';

// passes fetched publications to application
function fetchedPublications(publications) {
  return {
    type: types.FETCHED_PUBLICATIONS,
    data: publications,
  };
}

// converts date to yyyy-mm-dd format
function formatDate(date) {
  return date.toISOString().substring(0, 10);
}

// prepares date to passed to query url
function processDate(start, end) {
  const date = `${formatDate(start)}+TO+${formatDate(end)}`;
  return date;
}

// passes axios error message to application
function fetchError(message) {
  return {
    type: types.FETCH_ERROR,
    data: message,
  };
}

// clears application axios error messages
function clearError() {
  return {
    type: types.CLEAR_ERROR,
  };
}

// makes axios request for publications to remote API
function getPublications(dispatch, date, term) {
  const url = `${BASE_URL}${term}${MIDDLE_URL}${date}${TRAILING_URL}`;

  return axios.get(url)
    .then(result => result.data)
    .catch((err) => {
      const errorText = err.message === NETWORK_ERROR_MESSAGE ?
        NETWORK_ERROR_RESPONSE :
        err.message;
      dispatch(fetchError(errorText));
    });
}

// compose publications fetch based on date range
async function processQuery(dispatch, data) {
  const { term, startDate, endDate } = data;
  const publications = [];

  const endYear = endDate.getFullYear();
  let startYear = startDate.getFullYear();

  if (startYear === endYear) {
    const date = processDate(startDate, endDate);

    // make single request if date query is within same year
    publications.push(await getPublications(dispatch, date, term));
  } else {
    // fetch publications from start date till end of the same year
    let date = processDate(startDate, new Date(startYear, 11, 32));
    publications.push(await getPublications(dispatch, date, term));

    // begin fetching for subsequent years
    startYear += 1;
    while (startYear <= endYear) {
      if (startYear === endYear) {
        // fetch from begin of endDate year till endDate and end loop
        date = processDate(new Date(startYear, 0, 2), endDate);
        publications.push(await getPublications(dispatch, date, term));
      } else {
        // fetch from begin of year till end of the same year
        date = processDate(new Date(startYear, 0, 2), new Date(startYear, 11, 32));
        publications.push(await getPublications(dispatch, date, term));
      }
      startYear += 1;
    }
  }

  return publications;
}

// notifies application when beginning or ending fetching state
function fetching() {
  return {
    type: types.FETCHING_PUBLICATIONS,
  };
}

async function fetchPublications(dispatch, body) {
  // clear all errors before making new request
  await dispatch(clearError());

  // notify application of request kick off
  await dispatch(fetching());

  // await fetch of publications from remote API
  const publications = await processQuery(dispatch, body);

  // notify application of request conclusion
  await dispatch(fetching());

  // pass fetched publications to application if no axios error occured
  if (publications[0] !== undefined) {
    await dispatch(fetchedPublications(publications));
  }
}

export default {
  fetchPublications,
};
