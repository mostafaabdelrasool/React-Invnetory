import React, { Component } from 'react'
import { Table,Button } from "react-bootstrap";
import ProductDataService from './product.data.service';
import { faSave,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class ProductSizesComponent extends Component {
    state = {
        data: this.props.data || [],
        
    }
    dataService = new ProductDataService('productSizes')
    addItem() {
        let data = [...this.state.data];
        data.push({
            productId:this.props.productId,
            size:'',
            dimensions:'',
            unitInStock:'',
        });
        this.setState({ data });
    }
    handleChange(event, item, index) {
        const { name, value } = event.target;
        let data = [...this.state.data];
        data[index][name] = value;
        this.setState({ data });
    }
    save(item) {
        if (!item.id) {
            this.dataService.add(item)
        } else {
            this.dataService.update(item)
        }
    }
    deleteItem(id) {
        this.dataService.delete(id).then(res => {
            let model = [...this.state.data];
            const index = model.findIndex(m => m.id === id);
            model.splice(index, 1);
            this.setState({ data: model });
        });
    }
    render() {
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
                        <th>Dimensions</th>
                        <th>Unit In Stock</th>
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
                            <td> <input className="form-control"
                                value={x.dimensions}
                                name="dimensions"
                                onChange={e => this.handleChange(e, x, i)}></input>
                            </td>
                            <td> <input className="form-control"
                                value={x.unitInStock}
                                type="number"
                                name="unitInStock"
                                onChange={e => this.handleChange(e, x, i)}></input>
                            </td>
                            <td className="d-flex">
                                <Button  variant="dark" className="m-1" onClick={() => this.save(x)}>
                                    <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                                </Button>
                                <Button  variant="dark" className="m-1" onClick={() => this.deleteItem(x.id)}>
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                </Button>
                            </td>
                        </tr>)
                    })}
                </tbody>
          </Table>
        </div>)
    }
}
