import types from '../actions/types';

const initialState = {
  member: {},
  transaction: false,
  transactions: [],
  filter: false,
  errors: {},
};

function transactions(state = initialState, action) {
  if (action.type === types.FETCHED_TRANSACTION) {
    return { ...state, transactions: action.data };
  }
  if (action.type === types.ACTIVE_MEMBER) {
    return { ...state, member: action.data };
  }
  if (action.type === types.ACTIVE_TRANSACTION) {
    return { ...state, transaction: action.data };
  }
  if (action.type === types.APPLY_FILTER) {
    return { ...state, filter: action.data };
  }
  if (action.type === types.CLEAR_FILTER) {
    return { ...state, filter: false };
  }

  // handle errors
  if (action.type === types.MAIN_FETCH_ERROR) {
    return { ...state, errors: { ...state.errors, main: action.data } };
  }
  return state;
}

export default transactions;
