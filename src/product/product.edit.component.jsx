import React, { Component } from 'react'
import DataService from "../common/data/data.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Tabs, Tab } from "react-bootstrap";
import ProductSizesComponent from './product.sizes.component';
export default class ProductEdit extends Component {
    state = {
        categories: [],
        data: {
            ...(this.props.data || {
                productName: "",
                image: "",
                unitPrice: "",
                costPrice: "",
                unitsInStock: 0,
            })
        },
        isEdit: this.props.data ? true : false
    }
    constructor(props) {
        super(props);
        this.imgInput = React.createRef();
    }
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
    getCategories() {
        const dataServ = new DataService("Category");
        dataServ.get().then(d => {
            this.setState({ categories: d });
        });
    }
    componentDidMount() {
        this.getCategories();
    }
    render() {
        const imgSize = { width: "100%" };

        return (
            <div>
                <Tabs defaultActiveKey="profile">
                    <Tab eventKey="profile" title="Product">
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
                                        <label>Product Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="productName"
                                            value={this.state.data.productName}
                                            onChange={e => this.handleChange(e)}
                                        ></input>
                                    </div>
                                    <label>Unit Price</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="unitPrice"
                                        value={this.state.data.unitPrice}
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label>Cost Price</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="costPrice"
                                        value={this.state.data.costPrice}
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label>Units In Stock</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="unitsInStock"
                                        onChange={e => this.handleChange(e)}
                                        value={this.state.data.unitsInStock}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        className="form-control"
                                        name="categoryId"
                                        value={this.state.data.categoryId}
                                        onChange={e => this.handleChange(e)}
                                    >
                                        {this.state.categories.map((d, i) => {
                                            return <option key={i} value={d.id}>{d.categoryName}</option>;
                                        })}
                                    </select>
                                </div>
                                <Button onClick={e => this.handleSubmit(e)} variant="dark">
                                    Save
                       </Button>
                            </div>
                        </form>
                    </Tab>
                    <Tab eventKey="ProductSize" title="Profile Size">
                        <ProductSizesComponent></ProductSizesComponent>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}

