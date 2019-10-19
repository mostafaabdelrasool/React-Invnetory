import React from 'react';
import './App.css';
import ModelList from './model/model.list.component';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import LayoutComponent from './layout/layout.component';
import Category from './category/category.component';
import Product from './product/product.component';
import OrderList from './order/order.list.component';
import OrderEdit from './order/order.edit.component';
import CustomerComponent from './customer/customer.componenet';
function App() {

  return (
    <div>
      <Router>
        <div>
          <LayoutComponent>
            <Switch>
              <Route path="/home" component={ModelList} ></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/orders" component={OrderList}></Route>
              <Route path="/order-data" component={OrderEdit}></Route>
              <Route path="/customer" component={CustomerComponent}></Route>
            </Switch>
          </LayoutComponent>
        </div>
      </Router>
    </div>

  );
}

export default App;
