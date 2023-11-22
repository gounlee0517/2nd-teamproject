import { combineReducers, createStore } from "redux";
import userInfo from "../modules/userInfo";

const rootReducer = combineReducers({
    userInfo,
})

const store = createStore(rootReducer);

export default store;