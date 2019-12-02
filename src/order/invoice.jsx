import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Print from "../common/print/print";
import Receipt from "./invoice/receipt";
export default class Invoice extends Component {
    state = {
        paid: 0,
        returned: 0,
        showPrint: false,
    }
    handleChange(event) {
        const { value } = event.target;
        let { returned } = { ...this.state };
        if (+value >= +this.props.total) {
            returned = +value - +this.props.total;
        }
        this.setState({ returned: returned, paid: value });
    }
    save() {
        // window.open('../invoice/invoice.html');
        this.setState({ showPrint: true });
    }
    render() {
        let showPrint = this.state.showPrint ? <Print>
            <Receipt data={this.props.data}></Receipt>
        </Print> : null
        return (
            <div>
                {showPrint}
                <div className="form-group" >
                    <label>Paid</label>
                    <input className="form-control"
                        value={this.state.paid}
                        onChange={e => this.handleChange(e)}
                        type="number"></input>
                </div>
                <div className="form-group" >
                    <label>Return :{this.state.returned}</label>
                </div>
                <Button
                    variant="dark"
                    className="align-items-start"
                    onClick={() => {
                        this.save();
                    }}
                >
                    Save
                </Button>
            </div>
        );
    }
}