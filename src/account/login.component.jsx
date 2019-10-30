import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Login extends Component {
    state = {
        data: {}
    }
    submit() {

    }
    handleChange(event) {
        const { name, value } = event.target;
        let data = { ...this.state.data, [name]: value };
        this.setState({ data });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submit()}>
                    <div className="col-md-12 form-group">
                        <label>User Name</label>
                        <input name="userName" className="form-control" value={this.state.data.code}
                            onChange={e => this.handleChange(e)}></input>
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" value={this.state.data.code}
                            onChange={e => this.handleChange(e)}></input>
                    </div>
                    <div>
                        <Button onClick={this.submit()}>Login</Button>
                    </div>
                </form>

            </div>
        )
    }
}
