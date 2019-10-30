import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./layout.style.css";
export default class LayoutComponent extends Component {
  state = {
    token: ""
  }
  componentDidMount() {
    this.setState({ token: localStorage.getItem('Token') })
  }
  render() {
    return (
      <div>
        {this.state.token ? <nav className="navbar navbar-dark bg-dark">
          <ul className="d-flex justify-content-around col-md-12 navbar-brand">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/category">Categories</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/customer">Customers</Link>
            </li>
            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </nav> : null}
        <div className="p-2">{this.props.children}</div>
      </div>
    );
  }
}
