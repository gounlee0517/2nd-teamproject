import { combineReducers, createStore } from 'redux';
import isLogined from '../modules/isLogined';
import setUser from '../modules/userInfo';
const rootReducer = combineReducers({
  isLogined,
  setUser
});

const store = createStore(rootReducer);

export default store;
