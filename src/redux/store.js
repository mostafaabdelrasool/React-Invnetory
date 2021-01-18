import { createStore, combineReducers } from "redux";
import orderReducer from '../order/redux/order.reducer'
import productReducer from "../product/redux/product.reduce";
import { devToolsEnhancer } from 'redux-devtools-extension';


const reducers = combineReducers({ order: orderReducer, product: productReducer })
const store = createStore(reducers, devToolsEnhancer(
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
));
export default store;

