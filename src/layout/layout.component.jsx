import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./layout.style.css";
export default class LayoutComponent extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
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
          </ul>
        </nav>
        <div className="p-4">{this.props.children}</div>
      </div>
    );
  }
}
