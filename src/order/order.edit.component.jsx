import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import OrderDataService from "./order.data.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./order.style.css";
import OrderDetails from "./order.details.component";
import { Button } from "react-bootstrap";
export default class OrderEdit extends Component {
  state = {
    isLoading: false,
    customers: [],
    data: {
      shipAddress: "",
      shipCity: "",
      phone: "",
      orderDetails: [],
      customerId: null,
      total: 0,
      freight: 0,
      OverallTotal: 0
    },

  };

  dataServ = new OrderDataService("Order");
  componentDidMount() {
    this.setState({ initialData: { ...this.state.data } });
  }
  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        this.dataServ.searchCustomers(inputValue).then(c => {
          resolve(
            c.map(v => {
              return {
                value: v.id,
                label: v.companyName,
                address: v.address,
                city: v.city,
                phone: v.phone
              };
            })
          );
        });
      }, 1000);
    });
  handleChange(event) {
    const { name, value } = event.target;
    let data = { ...this.state.data, [name]: value };
    this.setState({ data });
  }
  handleDateChane(value, model) {
    let data = { ...this.state.data, [model]: value };
    this.setState({ data });
  }
  handleCustomerChange(value) {
    let data = { ...this.state.data };
    data.shipAddress = value.address;
    data.shipCity = value.city;
    data.phone = value.phone;
    data.customerId = value.value
    this.setState({ data });
  }
  save() {
    let data = { ...this.state.data };
    data.orderDetails = OrderDataService.getOrder().orderDetails;
    data.shipStatus = 2;
    this.setState({ data });
    this.dataServ.add(data).then(c => {
      this.setState({ data: { ...this.state.initialData } });
    });
  }
  updateOrderData = (val) => {
    let data = { ...this.state.data };
    data.total = val;
    data.OverallTotal = val + data.freight
    this.setState({ data })
  }
  handleFreightChange(event) {
    const { value } = event.target;
    let data = { ...this.state.data, freight: +value };
    data.OverallTotal = data.OverallTotal + data.freight
    this.setState({ data })
  }
  render() {
    const fontSize = { fontSize: '35px' }
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Button
              onClick={() => {
                this.save();
              }}
              variant="dark"
              className="align-items-start form-group"
            >
              Save
        </Button>
          </div>

          <div className="d-flex flex-fill">
            <div className="m-3">
              <div className="font-weight-bolder">Total</div>
              <div className="badge badge-dark" style={fontSize}>
                {this.state.data.total}</div>
            </div>
            <div className="m-3">
              <div className="font-weight-bolder">Overall Total</div>
              <div className="badge badge-dark" style={fontSize}>
                {this.state.data.OverallTotal}</div>
            </div>
          </div>
        </div>

        <div className="card form-group">
          <div className="card-header">Order Data</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 form-group d-flex">
                <label>
                  customer
                </label>
                <AsyncSelect
                  className="flex-fill"
                  cacheOptions
                  defaultOptions
                  loadOptions={this.promiseOptions}
                  onChange={e => this.handleCustomerChange(e)}
                />
              </div>
              <div className="col-md-3 form-group d-flex">
                <label className="d-block" htmlFor="">
                  Order date
                </label>
                <DatePicker
                  className="form-control"
                  selected={this.state.data.orderDate}
                  onChange={e => this.handleDateChane(e, "orderDate")}
                />
              </div>
              <div className="col-md-3 form-group  d-flex">
                <label className="d-block" htmlFor="">
                  Required date
                </label>
                <DatePicker
                  className="form-control"
                  selected={this.state.data.requiredDate}
                  onChange={e => this.handleDateChane(e, "requiredDate")}
                  name="requiredDate"
                />
              </div>
              <div className="col-md-3 form-group  d-flex">
                <label htmlFor="">Freight</label>
                <input
                  className="form-control"
                  type="number"
                  name="freight"
                  value={this.state.data.freight}
                  onChange={e => this.handleFreightChange(e)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 form-group  d-flex">
                <label htmlFor="">Address</label>
                <input
                  className="form-control"
                  type="text"
                  name="shipAddress"
                  value={this.state.data.shipAddress}
                  onChange={e => this.handleChange(e)}
                ></input>
              </div>
              <div className="col-md-4 form-group  d-flex">
                <label htmlFor="">City</label>
                <input
                  className="form-control"
                  type="text"
                  name="shipCity"
                  value={this.state.data.shipCity}
                  onChange={e => this.handleChange(e)}
                ></input>
              </div>
              <div className="col-md-4 form-group  d-flex">
                <label htmlFor="">Phone</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  value={this.state.data.phone}
                  onChange={e => this.handleChange(e)}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <OrderDetails order={this.state.data} onUpdate={this.updateOrderData}></OrderDetails>
      </div>
    );
  }
}
