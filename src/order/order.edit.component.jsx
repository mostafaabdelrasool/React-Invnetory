import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import OrderDataService from "./order.data.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./order.style.css";
import OrderDetails from "./order.details.component";
import { Button } from "react-bootstrap";
import castAllDates from "../common/data/cast.all.dates";
import Invoice from './invoice';
import ModalComponent from "../common/modal/modal";
import { connect } from 'react-redux';
import * as orderAtions from './redux/order.action'
class OrderEdit extends Component {
  state = {
    isLoading: false,
    customers: [],
    showPay: false,
  };

  dataServ = new OrderDataService("Order");
  componentDidMount() {
    this.setState({ initialData: { ...this.props.order } });
    var urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      this.dataServ.getById(id).then(x => {
        castAllDates(x)
        x.customer = this.mapCustomer(x.customer);
        x.orderDetails.forEach(x => {
          x.product = OrderDataService.mapProduct(x.product);
        })
        this.props.orderUpdate(x);
      })
    } else {
      const newOrder = this.dataServ.getNewOrderNumber();
      this.props.orderUpdate(newOrder);
    }
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
    let data = { ...this.props.order, [name]: value };
    this.props.orderUpdate(data);
  }
  handleDateChane(value, model) {
    let data = { ...this.props.order, [model]: value };
    this.props.orderUpdate(data);
  }
  handleCustomerChange(value) {
    let data = { ...this.props.order };
    data.shipAddress = value.address;
    data.shipCity = value.city;
    data.phone = value.phone;
    data.customerId = value.value
    this.props.orderUpdate(data);
  }
  save() {
    let data = { ...this.props.order };
    data.shipStatus = 2;
    let dataToSave = JSON.parse(JSON.stringify(data));;
    dataToSave.customer = undefined;
    dataToSave.orderDetails.forEach(x => { x.product = undefined });
    if (!dataToSave.id) {
      this.dataServ.add(dataToSave).then(c => {
         this.props.clearOrder();
      });
    } else {
      this.dataServ.update(dataToSave);
    }
  }
  handleFreightChange(event) {
    const { value } = event.target;
    let data = { ...this.props.order, freight: +value };
    data.overallTotal = data.total + data.freight
    this.props.orderUpdate(data);
  }
  pay() {
    let { showPay } = { ...this.state }
    showPay = !showPay;
    this.setState({ showPay: showPay });
  }
  closeModal = () => {
    this.setState({ showPay: false });
  };
  render() {
    const fontSize = { fontSize: '35px' }
    const pay = this.state.showPay ? (<ModalComponent close={this.closeModal}>
      <Invoice total={this.props.order.overallTotal} data={this.props.order}></Invoice >
    </ModalComponent>) : null
    return (
      <div>
        {pay}
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
            <Button
              onClick={() => {
                this.pay();
              }}
              variant="dark"
              className="align-items-start form-group"
            >
              Pay
        </Button>
          </div>

          <div className="d-flex flex-fill">
            <div className="m-3">
              <div className="badge badge-warning order-info" >
                Order Number: {this.props.order.orderNumber}
              </div>
            </div>
            <div className="m-3">
              <div className="badge badge-secondary order-info" style={fontSize}>
                Total: {this.props.order.total}</div>
            </div>
            <div className="m-3">
              <div className="badge badge-dark order-info" style={fontSize}>
                Overall Total : {this.props.order.overallTotal}</div>
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
                  value={this.props.order.customer}
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
                  selected={this.props.order.orderDate}
                  onChange={e => this.handleDateChane(e, "orderDate")}
                />
              </div>
              <div className="col-md-3 form-group  d-flex">
                <label className="d-block" htmlFor="">
                  Required date
                </label>
                <DatePicker
                  className="form-control"
                  selected={this.props.order.requiredDate}
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
                  value={this.props.order.freight}
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
                  value={this.props.order.shipAddress}
                  onChange={e => this.handleChange(e)}
                ></input>
              </div>
              <div className="col-md-4 form-group  d-flex">
                <label htmlFor="">City</label>
                <input
                  className="form-control"
                  type="text"
                  name="shipCity"
                  value={this.props.order.shipCity}
                  onChange={e => this.handleChange(e)}
                ></input>
              </div>
              <div className="col-md-4 form-group  d-flex">
                <label htmlFor="">Phone</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  value={this.props.order.phone}
                  onChange={e => this.handleChange(e)}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <OrderDetails ></OrderDetails>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { order: state.order }
}

const mapDispatchToProps = {
  updateItemAction: orderAtions.updateItemAction,
  newItemAcion: orderAtions.newItemAcion,
  orderUpdate: orderAtions.orderUpdate,
  clearOrder:orderAtions.clearOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit)
