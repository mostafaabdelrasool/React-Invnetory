import React, { Component } from "react";
import ModalComponent from "../modal/modal";
import { Button } from "react-bootstrap";
import StTableEditComponent from "./edit.list.component";
import DataService from "../data/data.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
export default class StTableComponent extends Component {
  state = { data: [], showEditPopup: false };
  dataService = new DataService(this.props.api);
  componentDidMount() {
    this.dataService.get().then(d => this.setState({ data: d }));
  }
  renderCell(data, body) {
    switch (body.type) {
      case "txt":
        return <p>{data[body.model]}</p>;
      case "img":
       const imgSize = { width: "100px" };
        return <img style={imgSize}  alt="" src={data[body.model]}></img>;
      default:
        return "";
    }
  }
  closeModal = () => {
    this.setState({ showEditPopup: false });
  };
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
  deleteItem(id) {
    this.dataService.delete(id).then(res => {
      let model = [...this.state.data];
      const index = model.findIndex(m => m.id === id);
      model.splice(index,1);
      this.setState({ data: model, showEditPopup: false });
    });
  }
  render() {
    let popup = this.state.showEditPopup ? (
      <ModalComponent close={this.closeModal}>
        <StTableEditComponent
         data={this.state.currentModel}
          fields={this.props.fields}
          saveData={this.saveData}
          addItem={this.addItem}
        ></StTableEditComponent>
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
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              {this.props.setting.header.map((h, i) => (
                <th key={i}>{h.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((d, di) => {
             return <tr key={di}>
                {this.props.setting.body.map((b, bi) => {
                  return (
                    <td key={bi}>
                     {this.renderCell(d, b)}
                    </td>
                  );
                })}
                <td>
                <Button
                      className="mr-1"
                      onClick={() => this.showEditPopup(d)}
                    >
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Button>
                    <Button onClick={() => this.deleteItem(d.id)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </Button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
        {popup}
      </div>
    );
  }
}
