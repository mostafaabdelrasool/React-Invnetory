import React from "react";
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../order.style.css";
import OrderDetails from "../order.details.component";
import { Button } from "react-bootstrap";
import Invoice from '../invoice';
import ModalComponent from "./.././../common/modal/modal"
import CustomerCreate from "./.././../customer/customer.create.component";
import "react-datepicker/dist/react-datepicker.css";
import "../order.style.css";

export default function RenderOrderEdit(){
    const fontSize = { fontSize: '35px' }
    const pay = this.state.showPay ? (<ModalComponent close={this.closeModal}>
      <Invoice total={this.props.order.overallTotal} data={this.props.order}></Invoice >
    </ModalComponent>) : null;
    const customer = this.state.showCustomer ? (<ModalComponent close={this.closeModal}>
      <CustomerCreate customer={this.getSavedCutomer}></CustomerCreate >
    </ModalComponent>) : null;
    return (
      <div className="order-container">
        {pay}
        {customer}
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
              className="align-items-start form-group m-3"
            >
              Pay
        </Button>
          </div>

          <div className="d-flex flex-fill justify-content-between">
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
            <div className="m-3">
              <Button
                onClick={() => {
                  this.openCustomerPopup();
                }}
                variant="dark"
                className="align-items-start form-group"
              >
                Add Customer
        </Button>
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