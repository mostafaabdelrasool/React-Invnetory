import React, { Component } from 'react'
import "./login.style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import AccountDataService from './account.service';
import { withRouter,Link } from 'react-router-dom'
export class Register extends Component {
    state = {
        data: {}
    }
    dataService = new AccountDataService();
    submit(event) {
        event.preventDefault();
        if (this.state.valid) {
            this.dataService.register(this.state.data).then(x => {
                localStorage.setItem('Token', x);
                this.props.history.push('/');
            })
        }

    }
    handleChange(event) {
        const { name, value } = event.target;
        let data = { ...this.state.data, [name]: value };
        this.setState({ data });
    }
    handleConfirmChange(event) {
        const { value } = event.target;
        this.setState({ valid: (value === this.state.data.password) });
    }
    render() {
        return (
            <div className="login-container">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="login-card">
                            <div className="card-header">
                                <h3>Register</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => this.submit(e)}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                            </span>
                                        </div>
                                        <input type="text" name="userName" className="form-control" placeholder="username" onChange={e => this.handleChange(e)}></input>

                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faKey}></FontAwesomeIcon></span>
                                        </div>
                                        <input type="password" name="password" className="form-control" placeholder="password" onChange={e => this.handleChange(e)}></input>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faKey}></FontAwesomeIcon></span>
                                        </div>
                                        <input type="password" name="confirmPassword" className="form-control" placeholder="confirm password" onChange={e => this.handleConfirmChange(e)}></input>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Register" className="btn float-right login_btn"></input>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    <Link to="login">  I have an account </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Register)