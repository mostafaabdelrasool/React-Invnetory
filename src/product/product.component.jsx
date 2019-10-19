import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../common/modal/modal";
import { faEdit, faTrash, faSitemap } from "@fortawesome/free-solid-svg-icons";
import ProductEdit from './product.edit.component'
import ProductDataService from "./product.data.service";
import ProductSizesComponent from "./product.sizes.component";
export default class Product extends Component {
  state = {
    data: [],
    showEditPopup: false,
    currentModel: {}
  };
  dataService = new ProductDataService("Product");
  componentDidMount() {
    this.dataService.get().then(res => {
      this.setState({ data: res });
    });
  }
  showEditPopup(model) {
    this.setState({ showEditPopup: true, currentModel: model });
  }
  saveData = data => {
    this.dataService.update(data).then(res => {
      let models = [...this.state.data];
      const index = models.findIndex(x => {
        return data.id === x.id;
      });
      models[index] = data;
      this.setState({ data: models, showEditPopup: false });
    });
  };
  addItem = data => {
    this.dataService.add(data).then(res => {
      let model = [...this.state.data];
      model.push(res);
      this.setState({ data: model, showEditPopup: false });
    });
  };
  closeModal = () => {
    this.setState({ showEditPopup: false });
  };
  deleteItem(id) {
    this.dataService.delete(id).then(res => {
      let model = [...this.state.data];
      const index = model.findIndex(m => m.id === id);
      model.splice(index, 1);
      this.setState({ data: model, showEditPopup: false });
    });
  }
  showChildItems(index) {
    let products = [...this.state.data]
    if (!products[index].showChild) {
      products[index].showChild = true;
      this.dataService.getProductSizes(products[index].id).then(x => {
        products[index].productSizes = x;
        this.setState({ data: products });
      });
    }else{
      products[index].showChild = false;
      this.setState({ data: products });
    }


  }
  renderProductSizes(product, index) {
    if (!product.productSizes) {
      return null
    }
    return < tr key={index}>
      <td colSpan="6">
        <ProductSizesComponent productId={product.id} data={product.productSizes}></ProductSizesComponent>
      </td>
    </tr>
  }
  render() {
    const imgSize = { width: "100px" };
    let popup = this.state.showEditPopup ? (
      <ModalComponent close={this.closeModal}>
        <ProductEdit
          data={this.state.currentModel}
          saveData={this.saveData}
          addItem={this.addItem}
        ></ProductEdit>
      </ModalComponent>
    ) : null;
    return (
      <div>
        <div className="row form-group">
          <Button
            onClick={() => {
              this.showEditPopup();
            }}
            variant="dark"
            className="align-items-start"
          >
            Add
          </Button>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th>ProductName</th>
              <th>Price</th>
              <th>Cost</th>
              <th>stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((x, i) => {
              let rows = [];
              rows.push(<tr key={i}>
                <td>
                  <img alt="" style={imgSize} src={x.image}></img>
                </td>
                <td>{x.productName}</td>
                <td>{x.unitPrice}</td>
                <td>{x.costPrice}</td>
                <td>{x.unitsInStock}</td>
                <td>
                  <Button
                    className="mr-1"
                    onClick={() => this.showChildItems(i)}
                  >
                    <FontAwesomeIcon icon={faSitemap}></FontAwesomeIcon>
                  </Button>
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
              </tr>)
              if (x.showChild) {
                rows.push(this.renderProductSizes(x, i + 1));
              }
              return rows
            })}
          </tbody>
        </Table>
        {popup}
      </div >
    );
  }
}
