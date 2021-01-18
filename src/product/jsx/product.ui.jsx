import React from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSitemap } from "@fortawesome/free-solid-svg-icons";
import ProductEdit from '../product.edit.component'
import ProductSizesComponent from "../product.sizes.component";
import ModalComponent from "./.././../common/modal/modal"
const RenderProductSizes = (product, index) => {
    if (!product.productSizes) {
        return null
    }
    return < tr key={index}>
        <td colSpan="6">
            <ProductSizesComponent productId={product.id} data={product.productSizes}></ProductSizesComponent>
        </td>
    </tr>
}

export default function RenderProduct() {
    let popup = this.state.showEditPopup ? (
        <ModalComponent close={this.closeModal}>
            <ProductEdit
                id={this.state.currentModel ? this.state.currentModel.id : null}
            ></ProductEdit>
        </ModalComponent>
    ) : null;
    return (
        <div>
            <div className="form-group">
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
                        <th>ProductName</th>
                        <th>Price</th>
                        <th>Discount</th>
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
                                {x.productCode}
                            </td>
                            <td>{x.productName}</td>
                            <td>{x.unitPrice}</td>
                            <td>{x.discount}</td>
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
                            rows.push(RenderProductSizes(x, i + 1));
                        }
                        return rows
                    })}
                </tbody>
            </Table>
            {popup}
        </div >
    );
}