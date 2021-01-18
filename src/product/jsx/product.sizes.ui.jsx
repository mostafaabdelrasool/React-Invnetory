import React from 'react'
import { Table, Button } from "react-bootstrap";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function RenderProductSize() {
        return (<div>
            <Button
                onClick={() => {
                    this.addItem();
                }}
                variant="dark"
                className="align-items-start m-1"
            >
                Add
      </Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Size</th>
                        <th>Unit In Stock</th>
                        <th>Barcode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((x, i) => {
                        return (<tr key={i}>
                            <td>
                                <input className="form-control"
                                    value={x.size}
                                    name="size"
                                    onChange={e => this.handleChange(e, x, i)}></input>
                            </td>
                            <td>
                                <input className="form-control"
                                    value={x.unitInStock}
                                    name="unitInStock"
                                    type="number"
                                    onChange={e => this.handleChange(e, x, i)}></input>
                            </td>
                            <td> <input className="form-control"
                                value={x.barcode}
                                name="barcode"
                                onChange={e => this.handleChange(e, x, i)}></input>
                            </td>
                            <td className="d-flex">
                                <Button variant="dark" className="m-1" onClick={() => this.deleteItem(x.id)}>
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                </Button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>)
}