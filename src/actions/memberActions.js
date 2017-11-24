
import axios from 'axios';
import types from './types';

const BASE_URL = 'http://localhost:4000/api/transactions';
const NETWORK_ERROR_MESSAGE = 'Request failed with status code 404';
const NETWORK_ERROR_RESPONSE = 'Check your network connection';

function applyFilter(filter) {
  return {
    type: types.APPLY_FILTER,
    data: filter,
  };
}

function handleFilter(filter, dispatch) {
  dispatch(applyFilter(filter));
}

function clearFilter() {
  return {
    type: types.CLEAR_FILTER,
  };
}

function fetchTransaction(transactions) {
  return {
    type: types.FETCHED_TRANSACTION,
    data: transactions,
  };
}

function currentMember(member) {
  return {
    type: types.ACTIVE_MEMBER,
    data: member,
  };
}

function currentTransaction(transaction) {
  return {
    type: types.ACTIVE_TRANSACTION,
    data: transaction,
  };
}

function setCurrentTransaction(transaction, dispatch) {
  dispatch(currentTransaction(transaction));
}

function handleAxiosError(message, type) {
  return {
    type,
    data: message,
  };
}

function getTransaction(errorType, dispatch, id, offset, filter) {
  const url = `${BASE_URL}/${id}/${offset}`;
  let axiosRequest;

  // clear existing store errors
  dispatch(handleAxiosError(false, errorType));

  if (filter) {
    axiosRequest = axios.get(url, { params: filter });
  } else {
    axiosRequest = axios.get(url);
    dispatch(clearFilter());
  }

  axiosRequest
    .then((result) => {
      dispatch(fetchTransaction(result.data));
    })
    .catch((err) => {
      const errorText = err.message === NETWORK_ERROR_MESSAGE ?
        NETWORK_ERROR_RESPONSE :
        err.message;
      dispatch(handleAxiosError(errorText, errorType));
    });
}

function get6MonthsTransaction(member) {
  const url = `${BASE_URL}/${member.id}/0`;
  const filter = {
    date: 'Last 6 Months',
    noLimit: true,
  };
  return axios.get(url, { params: filter });
}

export default {
  fetchTransaction,
  handleFilter,
  getTransaction,
  currentMember,
  clearFilter,
  setCurrentTransaction,
  get6MonthsTransaction,
};
