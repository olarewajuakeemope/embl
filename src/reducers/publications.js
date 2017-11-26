import types from '../actions/types';

const initialState = {
  publications: [],
  error: '',
  fetching: false,
  query: {},
};

function publications(state = initialState, action) {
  if (action.type === types.FETCHING_PUBLICATIONS) {
    return { ...state, fetching: !state.fetching };
  }

  if (action.type === types.FETCHED_PUBLICATIONS) {
    return { ...state, publications: action.data };
  }

  if (action.type === types.SET_QUERY) {
    return { ...state, query: action.data };
  }

  if (action.type === types.CLEAR_ERROR) {
    return { ...state, error: '' };
  }

  if (action.type === types.FETCH_ERROR) {
    return { ...state, error: action.data };
  }

  return state;
}

export default publications;
