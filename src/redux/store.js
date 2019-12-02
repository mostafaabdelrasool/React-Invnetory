import { createStore, combineReducers } from "redux";
import orderReducer from '../order/redux/reducer'
const reducers = combineReducers({ order: orderReducer })
const store = createStore(reducers);
export default store;

