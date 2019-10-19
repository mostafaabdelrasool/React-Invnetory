import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
export default class ModelEditComponent extends Component {
  constructor(props) {
    super(props);
    this.imgInput = React.createRef();
  }
  state = {
    data: {
      ...(this.props.data || {
        code: "",
        image: "",
        dimension: "",
        sizes: "",
        cost: 0,
        salesPrice: 0,
        manifature: ""
      })
    },
    isEdit: this.props.data ? true : false
  };
  handleChange(event) {
    const { name, value } = event.target;
    let data = { ...this.state.data, [name]: value };
    this.setState({ data });
  }
  handleSubmit() {
    if (this.state.isEdit) this.props.saveData.apply(null, [this.state.data]);
    else this.props.addItem.apply(null, [this.state.data]);
  }
  uploadImage() {
    this.imgInput.current.click();
  }
  onImageSelected(e) {
    var reader = new FileReader();
    reader.onload = loadEvent => {
      let data = { ...this.state.data };
      data.image = loadEvent.target.result;
      this.setState({ data });
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  render() {
    const imgSize = { width: "100%" };

    return (
      <div>
        <form className="row">
          <div className="form-group col-md-4">
            <input
              ref={this.imgInput}
              type="file"
              hidden
              onChange={e => this.onImageSelected(e)}
            ></input>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.uploadImage()}
            ></FontAwesomeIcon>
            <img style={imgSize} src={this.state.data.image} alt=""></img>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <div className="form-group">
                <label>Code</label>
                <input
                  className="form-control"
                  type="text"
                  name="code"
                  value={this.state.data.code}
                  onChange={e => this.handleChange(e)}
                ></input>
              </div>
              <label>Dimensions</label>
              <input
                className="form-control"
                type="text"
                name="dimension"
                value={this.state.data.dimension}
                onChange={e => this.handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Sizes</label>
              <input
                className="form-control"
                type="text"
                name="sizes"
                value={this.state.data.sizes}
                onChange={e => this.handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Cost</label>
              <input
                className="form-control"
                type="number"
                name="cost"
                onChange={e => this.handleChange(e)}
                value={this.state.data.cost}
              ></input>
            </div>
            <div className="form-group">
              <label>Sales Price</label>
              <input
                className="form-control"
                type="number"
                onChange={e => this.handleChange(e)}
                name="salesPrice"
                value={this.state.data.salesPrice}
              ></input>
            </div>
            <div className="form-group">
              <label>Manifature</label>
              <input
                className="form-control"
                type="text"
                name="manifature"
                onChange={e => this.handleChange(e)}
                value={this.state.data.manifature}
              ></input>
            </div>
            <Button onClick={e => this.handleSubmit(e)} variant="dark">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
