import { combineReducers, createStore } from 'redux';
import isLogined from '../modules/isLogined';

const rootReducer = combineReducers({
  isLogined
});

const store = createStore(rootReducer);

export default store;
