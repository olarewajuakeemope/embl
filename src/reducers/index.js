import { combineReducers } from 'redux';
import manageTransactions from './transactions';

const rootReducer = combineReducers({
  // Add all reducers here
  manageTransactions,
});

export default rootReducer;
