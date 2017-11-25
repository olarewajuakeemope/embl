import { combineReducers } from 'redux';
import managePublications from './publications';

const rootReducer = combineReducers({
  // Add all reducers here
  managePublications,
});

export default rootReducer;
