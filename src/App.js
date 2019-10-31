import React from 'react';
import './App.css';
import ModelList from './model/model.list.component';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import LayoutComponent from './layout/layout.component';
import Category from './category/category.component';
import Product from './product/product.component';
import OrderList from './order/order.list.component';
import OrderEdit from './order/order.edit.component';
import CustomerComponent from './customer/customer.componenet';
import Login from './account/login.component';
import Register from './account/register.component';
function App() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <PrivateRoute path="/models">
              <ModelList></ModelList>
            </PrivateRoute>
            <PrivateRoute path="/category">
              <Category></Category>
            </PrivateRoute>
            <PrivateRoute path="/product">
              <Product></Product>
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <OrderList></OrderList>
            </PrivateRoute>
            <PrivateRoute path="/order-data">
              <OrderEdit></OrderEdit>
            </PrivateRoute>
            <PrivateRoute path="/customer">
              <CustomerComponent></CustomerComponent>
            </PrivateRoute>
          </Switch>

        </div>
      </Router>
    </div>

  );
}
function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem('Token');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          <LayoutComponent>
            {children}
          </LayoutComponent>

        ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
      }
    />
  );
}
export default App;
