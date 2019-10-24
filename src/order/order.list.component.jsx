import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import OrderDataService from "./order.data.service";
export default class OrderList extends Component {
  state = {
    data: [],
    shipStatus: [{ name: "Shipped", value: 1 },
    { name: "InProgress", value: 2 },
    { name: "Cancelled", value: 3 },
    { name: "Reverted", value: 4 }]
  };
  componentDidMount() {
    this.dataServ.get().then(d => {
      this.setState({ data: d });
    });
  }

  dataServ = new OrderDataService("Order");
  deleteItem(id, index) {
    this.dataServ.delete(id).then(x => {
      let data = [...this.state.data];
      data.splice(index, 1);
      this.setState({ data });
    });
  }
  handleStatusChange(event, index) {
    const { value } = event.target;
    let data = [...this.state.data];
    data[index].shipStatus = value;
    const order = { id: this.state.data[index].id, shipStatus: this.state.data[index].shipStatus }
    this.dataServ.updateOrderStatus(order).then(x => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <div>
        <div className="form-group">
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
              <th>Status</th>
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
                  <td>    <select
                    className="form-control"
                    name="shipStatus"
                    value={x.shipStatus}
                    onChange={e => this.handleStatusChange(e, i)}
                  >
                    {this.state.shipStatus.map((d, sindex) => {
                      return <option key={sindex} value={d.value}>{d.name}</option>;
                    })}
                  </select>
                  </td>
                  <td>
                    <Link to={"/order-data?id="+x.id} className="btn btn-primary mr-1"> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>
                    <Button onClick={() => this.deleteItem(x.id, i)}>
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
