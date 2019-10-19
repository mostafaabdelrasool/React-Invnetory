import React, { Component } from "react";
import DataService from "../common/data/data.api";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
export default class OrderList extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.dataServ.get().then(d => {
      this.setState({ data: d });
    });
  }
  
  dataServ = new DataService("Order");
  render() {
    return (
      <div>
        <div className="row form-group">
          <Button
            variant="dark"
            className="align-items-start"
          >
             <Link to="/order-data">Add</Link>
          </Button>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Required Date</th>
              <th>Address</th>
              <th>City</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.customer.companyName}</td>
                  <td>{x.orderDate}</td>
                  <td>{x.requiredDate}</td>
                  <td>{x.shipAddress}</td>
                  <td>{x.shipCity}</td>
                  <td>{x.phone}</td>
                  <td>
                    <Button
                      className="mr-1"
                      onClick={() => this.showEditPopup(x)}
                    >
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Button>
                    <Button onClick={() => this.deleteItem(x.id)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
