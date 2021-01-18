import React, { Component } from 'react'
import DataService from "../common/data/data.api";
import { Button, Tabs, Tab } from "react-bootstrap";
import ProductSizesComponent from './product.sizes.component';
import { connect } from 'react-redux';
import * as productActions from "./redux/product.action";
import ProductDataService from "./product.data.service";
import store from "../redux/store";

const PRODUCT_SIZE_TAB = "productSize"
const PRODUCT_TAB = "product"
class ProductEdit extends Component {

    state = {
        categories: [],
        data: {},
    }
    dataService = {};
    constructor(props) {
        super(props);
        this.dataService = new ProductDataService("Product");
    }
    getCurrentStateProduct() {
        if (this.props.id) {
            const storeState = store.getState();
            const currentProduct = storeState.product.find(x => x.id === this.props.id);
            this.setState({ data: currentProduct })
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        let data = { ...this.state.data, [name]: value };
        this.setState({ data });
    }
    handleSubmit() {
        let data = { ...this.state.data };
        data.productSizes = this.psComponent.getData();
        this.setState({data})
        if (this.state.data.id) {
            this.updateItem(data);
        }
        else {
            this.addItem(data);
        };
    }
    updateItem = (data) => {
        this.dataService.update(data).then(res => {
            this.props.UpdateProductAction(data)
        });
    };
    addItem = (data) => {
        this.dataService.add(data).then(res => {
            this.props.AddProductAction(res)
        });
    };
    getCategories() {
        const dataServ = new DataService("Category");
        dataServ.get().then(d => {
            this.setState({ categories: d });
        });
    }
    componentDidMount() {
        this.getCategories();
        this.getCurrentStateProduct();
    }
    render() {
        return (
            <div>
                <div>
                    <Button className="m-1" onClick={e => this.handleSubmit(e)} variant="dark">
                        Save
                    </Button>
                </div>
                <Tabs defaultActiveKey={PRODUCT_TAB} activeKey={this.state.currentTab}>
                    <Tab eventKey={PRODUCT_TAB} title="Product">
                        <form className="row">
                            <div className="form-group col-md-6">
                                <label>Product Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="productName"
                                    value={this.state.data.productName}
                                    onChange={e => this.handleChange(e)}
                                ></input>
                            </div>
                            <div className="form-group col-md-6 ">
                                <label>Unit Price</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="unitPrice"
                                    value={this.state.data.unitPrice}
                                    onChange={e => this.handleChange(e)}
                                ></input>
                            </div>


                            <div className="form-group col-md-6">
                                <label>Cost Price</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="costPrice"
                                    value={this.state.data.costPrice}
                                    onChange={e => this.handleChange(e)}
                                ></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Units In Stock</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="unitsInStock"
                                    onChange={e => this.handleChange(e)}
                                    value={this.state.data.unitsInStock}
                                ></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Discount</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="discount"
                                    onChange={e => this.handleChange(e)}
                                    value={this.state.data.discount}
                                ></input>
                            </div>
                            <div className="form-group col-md-6">
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

                        </form>
                    </Tab>
                    <Tab eventKey={PRODUCT_SIZE_TAB} title="Product Size">
                        <ProductSizesComponent productId={this.state.data.id} onRef={ref => (this.psComponent = ref)}></ProductSizesComponent>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}
const mapDispatchToProps = {
    AddProductAction: productActions.AddProductAction,
    UpdateProductAction: productActions.UpdateProductAction,
    DeleteProductAction: productActions.DeleteProductAction,
}
const mapStateToProps = (state) => {
    return { data: state.product }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)

