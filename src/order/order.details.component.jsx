import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import OrderDataService from "./order.data.service";
import { Button } from "react-bootstrap";
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class OrderDetails extends Component {
  dataServ = new OrderDataService("Order");
  state = {
    order: OrderDataService.order
  };
  componentWillMount() {
    let order = { ...this.state.order };
    order.orderDetails = [];
    this.changeState(order);
  }
  changeState(data) {
    this.setState({ order: data });
    OrderDataService.updateOrder(data);

  }
  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        this.dataServ.searchProduct(inputValue).then(c => {
          resolve(
            c.map(v => {
              return {
                value: v.id,
                label: v.productName,
                unitPrice: v.unitPrice,
                unitsInStock: v.unitsInStock,
                image: v.image,
                productSizes: v.productSizes
              };
            })
          );
        });
      }, 1000);
    });
  addNewProduct() {
    let order = { ...this.state.order };
    order.orderDetails.push({
      quantity: 0,
      discount: 0,
      total: 0,
      productSizes: []
    });
    this.changeState(order);
  }
  handleProductChange(value, index) {
    let data = { ...this.state.order };
    let orderDetail = {};
    orderDetail.productId = value.value;
    orderDetail.unitPrice = value.unitPrice;
    orderDetail.quantity = 1;
    orderDetail.unitsInStock = value.unitsInStock;
    orderDetail.image = value.image;
    orderDetail.discount = 0;
    orderDetail.productSizes = value.productSizes;
    orderDetail.productSizeId = value.productSizes.length > 0 ? value.productSizes[0].id : "";
    orderDetail.total = (+orderDetail.quantity * orderDetail.unitPrice);
    data.orderDetails[index] = orderDetail;
    this.changeState(data);
    this.calculateTotal();
  }
  handleChange(event, orderDetail, index) {
    const { name, value } = event.target;
    let data = { ...this.state.order };
    orderDetail[name] = value;
    orderDetail.total = (+orderDetail.quantity * orderDetail.unitPrice);
    if (+orderDetail.discount > 0) {
      orderDetail.total = orderDetail.total - (orderDetail.total * (+orderDetail.discount / 100))
    }
    data.orderDetails[index] = orderDetail;
    this.calculateTotal();
    this.setState({ data });
  }
  handleProductSizeChange(event, index) {
    const { value } = event.target;
    let data = { ...this.state.order };
    data.orderDetails[index].productSizeId = value;
    this.changeState(data);
  }
  removeItem(item, index) {
    if (item.id) {

    }
    let data = { ...this.state.order };
    data.orderDetails.splice(index, 1);
    this.changeState(data);
    this.calculateTotal();
  }
  calculateTotal() {
    let data = { ...this.state.order };
    let total = 0;
    data.orderDetails.forEach(x => {
      total += x.total;
    })
    this.props.onUpdate(total);
  }
  render() {
    const imgSize = { width: "100px" };
    return (
      <div className="form-group mt-1">
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
                  <th>Image</th>
                  <th>Size</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.order.orderDetails.map((d, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={this.promiseOptions}
                          onChange={e => this.handleProductChange(e, i)}
                        />
                      </td>
                      <td>
                        <img style={imgSize} src={d.image} alt=""></img>
                      </td>
                      <td>
                        <select
                          className="form-control"
                          value={d.productSizeId}
                          onChange={e => this.handleProductSizeChange(e, i)}
                        >
                          {d.productSizes.map((d, i) => {
                            return <option key={i} value={d.id}>{d.size}</option>;
                          })}
                        </select>
                      </td>
                      <td >
                        <input type="number" value={d.quantity} className="form-control" name="quantity"
                          onChange={e => this.handleChange(e, d, i)}></input>
                      </td>
                      <td>{d.unitPrice}</td>
                      <td className="d-flex">
                        <input className="form-control mr-1"
                          name="discount"
                          onChange={e => this.handleChange(e, d, i)}></input>%
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
