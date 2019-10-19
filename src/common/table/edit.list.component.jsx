import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default class StTableEditComponent extends Component {
  constructor(props) {
    super(props);
    this.imgInput = React.createRef();
  }
  state = {
    data: {
      ...(this.props.data || {})
    },
    isEdit: this.props.data ? true : false
  };
  handleChange(event) {
    const { name, value } = event.target;
    let data = { ...this.state.data, [name]: value };
    this.setState({ data });
  }
  save() {
    if (this.state.isEdit) this.props.saveData.apply(null, [this.state.data]);
    else this.props.addItem.apply(null, [this.state.data]);
  }
  uploadImage() {
    this.imgInput.current.click();
  }
  onImageSelected(e,model) {
    var reader = new FileReader();
    reader.onload = loadEvent => {
      let data = { ...this.state.data };
      data[model] = loadEvent.target.result;
      this.setState({ data });
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  render() {
    const imgSize = { width: "100px" };
    return (
      <div>
        {this.props.fields.map((f, i) => {
          switch (f.type) {
            case "txt":
              return (
                <div key={i} className="form-group">
                  <label>{f.label}</label>
                  <input
                    className="form-control"
                    name={f.model}
                    value={this.state.data[f.model] || ""}
                    onChange={e => this.handleChange(e)}
                  ></input>
                </div>
              );
            case "number":
              return (
                <div key={i} className="form-group">
                  <label>{f.label}</label>
                  <input
                    type="number"
                    className="form-control"
                    name={f.model}
                    value={this.state.data[f.model] || ""}
                    onChange={e => this.handleChange(e)}
                  ></input>
                </div>
              );
            case "dropDown":
              return (
                <div key={i} className="form-group">
                  <select
                    className="form-control"
                    name={f.model}
                    value={this.state.data[f.model] || ""}
                    onChange={e => this.handleChange(e)}
                  >
                    {f.data.map((d, i) => {
                      return <option key={i}>{d[f.displayVal]}</option>;
                    })}
                  </select>
                </div>
              );
            case "img":
              return (
                <div key={i} className="form-group">
                  <input
                    ref={this.imgInput}
                    type="file"
                    hidden
                    onChange={e => this.onImageSelected(e,f.model)}
                  ></input>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => this.uploadImage()}
                  ></FontAwesomeIcon>
                  <img style={imgSize} src={this.state.data.image} alt=""></img>
                </div>
              );
            default:
              return null;
          }
        })}
        <Button
          onClick={() => {
            this.save();
          }}
          variant="dark"
          className="align-items-start"
        >
          Save
        </Button>
      </div>
    );
  }
}
