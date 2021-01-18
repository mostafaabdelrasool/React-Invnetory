import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import OrderDataService from "./order.data.service";
import { Button, Alert } from "react-bootstrap";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import * as orderActions from './redux/order.action'
import debounce from "../common/data/debounce";

class OrderDetails extends Component {
  dataServ = new OrderDataService("Order");
  state = {
    showAlert: false,
    alertMessage: ""
  };
  componentWillMount() {
    this.changeState(this.props.order);
  }
  changeState(data) {
    this.props.orderUpdate(data)
  }
  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.order !== newProps.order) {
      this.changeState(newProps.order)
    }
  }
  searchProductDebounce = debounce((inputValue, callBack) => {
    this.dataServ.searchProduct(inputValue).then((data) => {
      if (callBack) {
        callBack(data);
      }
    });
  }, 300)
  promiseOptions = inputValue => {
    if (!inputValue) {
      return
    }
    return new Promise(resolve => {
      this.searchProductDebounce(inputValue, (data) => {
        resolve(
          data.map(v => {
            return OrderDataService.mapProduct(v);
          }))
      })
    })
  }
  addNewProduct() {
    let order = { ...this.props.order };
    order.orderDetails.push({
      quantity: 0,
      discount: 0,
      total: 0,
    });
    this.changeState(order);
  }
  handleProductChange(value, index) {
    value.index = index;
    this.props.addOrderItem(value)
  }
  handleChange(event, orderDetail, index) {
    const { name, value } = event.target;
    if (name === "quantity") {
      this.validateStock(orderDetail, value);
    }
    let data = { ...this.props.order };
    orderDetail[name] = value;
    data.orderDetails[index] = orderDetail;
    this.props.updateItemAction(data);
  }
  validateStock(orderDetail, value) {
    this.dataServ.validateStock(orderDetail.productId, value).then(x => {
      if (!x) {
        this.setState({ showAlert: true, alertMessage: "Value exceed this amount in stock" });
      }
    })

  }
  removeItem(item, index) {
    if (item.id) {
      let order = { ...this.props.order }
      order.orderDetails = [];
      order.orderDetails.push(item);
      this.dataServ.deleteItem(order)
    }
    this.props.removeOrderItem(item);
  }


  renderAlert() {
    if (!this.state.showAlert)
      return;
    setTimeout(() => {
      this.setState({ showAlert: false, alertMessage: "" });
    }, 5000);
    return this.state.showAlert ? (<div className="alert-container">
      <Alert variant="danger" show={this.state.showAlert} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {this.state.alertMessage}
        </p>
      </Alert>
    </div>) : null;
  }

  render() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid white',
        color: state.isSelected ? 'red' : 'white',
        backgroundColor: 'black'
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
      },
    }
    return (

      <div className="form-group mt-1">
        {this.renderAlert()}
        <div className="card ">
          <div className="card-header">Order Products</div>
          <div className="card-body">
            <Button className="form-group mr-1" onClick={() => this.addNewProduct()}>
              Add
            </Button>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.order.orderDetails.map((d, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <AsyncSelect
                          value={d.product}
                          cacheOptions
                          defaultOptions
                          loadOptions={this.promiseOptions}
                          onChange={e => this.handleProductChange(e, i)}
                          styles={customStyles}
                        />
                      </td>
                      <td>
                        {d.product ? d.product.productName : ''}
                      </td>
                      <td>
                        {d.product ? d.product.size : ''}
                      </td>
                      <td className="number-cell-width">
                        <input type="number" value={d.quantity} className="form-control" name="quantity"
                          onChange={e => this.handleChange(e, d, i)}></input>
                      </td>
                      <td>{d.unitPrice}</td>
                      <td className="d-flex number-cell-width">
                        <input className="form-control mr-1"
                          name="discount"
                          readOnly
                          value={d.discount}
                        ></input>%
                      </td>
                      <td>{d.total}</td>
                      <td>
                        <Button className="form-group mr-1" onClick={() => this.removeItem(d, i)}>
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { order: state.order }
}

const mapDispatchToProps = {
  updateItemAction: orderActions.updateItemAction,
  newItemAcion: orderActions.newItemAcion,
  orderUpdate: orderActions.orderUpdate,
  clearOrder: orderActions.clearOrder,
  removeOrderItem: orderActions.removeOrderItem,
  addOrderItem: orderActions.addOrderItem,
  changeProductSize: orderActions.changeProductSize
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
