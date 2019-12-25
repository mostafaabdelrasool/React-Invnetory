import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import DataService from '../common/data/data.api';

export default class CustomerCreate extends Component {
    state = { data: { companyName: '', phone: '' } }
    handleChange(event) {
        const { name, value } = event.target;
        let data = { ...this.state.data, [name]: value };
        this.setState({ data });
    }
    handleSubmit(data){
        this.dataService.add(this.state.data).then(x=>{
         this.props.customer.apply(null,[x])
        })
    }
    dataService = new DataService("Order/Customer");
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="companyName"
                            value={this.state.data.companyName}
                            onChange={e => this.handleChange(e)}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            className="form-control"
                            type="text"
                            name="phone"
                            value={this.state.data.phone}
                            onChange={e => this.handleChange(e)}
                        ></input>
                    </div>
                    <div>
                        <Button onClick={e => this.handleSubmit(e)} variant="dark">
                            Save
                       </Button>
                    </div>
                </form>
            </div>
        )
    }
}
