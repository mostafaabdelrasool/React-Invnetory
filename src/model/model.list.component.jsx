import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../common/modal/modal";
import ModelEditComponent from "./model.edit.component";
import DataService from "../common/data/data.api";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
export default class ModelList extends Component {
  state = {
    data: [],
    showEditPopup: false,
    currentModel: {}
  };
  dataService = new DataService("ModelDesign");
  showEditPopup(model) {
    this.setState({ showEditPopup: true, currentModel: model });
  }
  componentDidMount() {
    this.dataService.get().then(res => {
      this.setState({ data: res });
    });
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
      model.splice(index,1);
      this.setState({ data: model, showEditPopup: false });
    });
  }
  render() {
    const imgSize = { width: "100px" };
    let popup = this.state.showEditPopup ? (
      <ModalComponent close={this.closeModal}>
        <ModelEditComponent
          data={this.state.currentModel}
          saveData={this.saveData}
          addItem={this.addItem}
        ></ModelEditComponent>
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
              <th>Code</th>
              <th>Image</th>
              <th>Dimension</th>
              <th>Sizes</th>
              <th>Cost</th>
              <th>Sales Price</th>
              <th>Manifature</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.code}</td>
                  <td>
                    <img alt="" style={imgSize} src={x.image}></img>
                  </td>
                  <td>{x.dimension}</td>
                  <td>{x.sizes}</td>
                  <td>{x.cost}</td>
                  <td>{x.salesPrice}</td>
                  <td>{x.manifature}</td>
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
        {popup}
      </div>
    );
  }
}
