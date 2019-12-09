import { createStore, combineReducers  } from "redux";
import orderReducer from '../order/redux/order.reducer'
import { devToolsEnhancer } from 'redux-devtools-extension';


const reducers = combineReducers({ order: orderReducer })
const store = createStore(reducers, devToolsEnhancer(
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  ));
export default store;

