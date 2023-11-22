import { createStore, combineReducers } from 'redux';
import thanks from '../modules/thanks';

const rootReducer = combineReducers({ thanks });

const store = createStore(rootReducer);

export default store;
