import React from 'react'
import { Button, Tabs, Tab } from "react-bootstrap";
import ProductSizesComponent from '../product.sizes.component';

const PRODUCT_SIZE_TAB = "productSize"
const PRODUCT_TAB = "product"
export default function RenderProductEdit(){
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
                    <ProductSizesComponent productId={this.props.id} onRef={ref => (this.psComponent = ref)}></ProductSizesComponent>
                </Tab>
            </Tabs>

        </div>
    );
}