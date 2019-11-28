import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import OrderDataService from "./order.data.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./order.style.css";
import OrderDetails from "./order.details.component";
import { Button } from "react-bootstrap";
import castAllDates from "../common/data/cast.all.dates";
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
      overallTotal: 0,
      orderDate: new Date()
    },

  };

  dataServ = new OrderDataService("Order");
  componentDidMount() {
    this.setState({ initialData: { ...this.state.data } });
    var urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      this.dataServ.getById(id).then(x => {
        castAllDates(x)
        x.customer = this.mapCustomer(x.customer);
        x.orderDetails.forEach(x => {
          x.product = OrderDataService.mapProduct(x.product);
        })
        this.setState({ data: x });
      })
    } else {
      this.getNewOrderNumber()
    }
  }
  getNewOrderNumber() {
    let now = Date.now().toString() // '1492341545873'
    // pad with extra random digit
    now += now + Math.floor(Math.random() * 10)
    // format
    const newNumber = [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-');
    let data = { ...this.state.data }
    data.orderNumber = newNumber;
    this.setState({ data: data })
  }
  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        this.dataServ.searchCustomers(inputValue).then(c => {
          resolve(
            c.map(v => this.mapCustomer(v))
          );
        });
      }, 1000);
    });
  mapCustomer(customer) {
    return {
      value: customer.id,
      label: customer.companyName,
      address: customer.address,
      city: customer.city,
      phone: customer.phone
    };
  }
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
    let dataToSave = JSON.parse(JSON.stringify(data));;
    dataToSave.customer = undefined;
    dataToSave.orderDetails.forEach(x => { x.product = undefined });
    if (!dataToSave.id) {
      this.dataServ.add(dataToSave).then(c => {
        this.setState({ data: { ...this.state.initialData } });
      });
    } else {
      this.dataServ.update(dataToSave);
    }
  }
  updateOrderData = (val) => {
    let data = { ...this.state.data };
    data.total = val;
    data.overallTotal = val + data.freight
    this.setState({ data })
  }
  handleFreightChange(event) {
    const { value } = event.target;
    let data = { ...this.state.data, freight: +value };
    data.overallTotal = data.total + data.freight
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
              <div className="badge badge-warning order-info" >
                Order Number: {this.state.data.orderNumber}
              </div>
            </div>
            <div className="m-3">
              <div className="badge badge-secondary order-info" style={fontSize}>
                Total: {this.state.data.total}</div>
            </div>
            <div className="m-3">
              <div className="badge badge-dark order-info" style={fontSize}>
                Overall Total : {this.state.data.overallTotal}</div>
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
                  value={this.state.data.customer}
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
              <div className="col-md-2 form-group  d-flex">
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
