import React, { Component } from 'react'
import "./login.style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link,withRouter } from 'react-router-dom'
import AccountDataService from './account.service';
export  class Login extends Component {
    state = {
        data: {}
    }
    componentDidMount(){
        localStorage.removeItem('Token');
    }
    dataService = new AccountDataService("Account");
    submit(event) {
        event.preventDefault();
        this.dataService.login(this.state.data).then(x=>{
            localStorage.setItem('Token',x);
            this.props.history.push('/');
        })
    }
    handleChange(event) {
        const { name, value } = event.target;
        let data = { ...this.state.data, [name]: value };
        this.setState({ data });
    }
    render() {
        return (
            <div className="login-container">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="login-card">
                            <div className="card-header">
                                <h3>Sign In</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e)=>this.submit(e)}>
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
                                    <div className="row align-items-center remember">
                                        <input type="checkbox" defaultChecked={false} name="rememberMe"  onChange={e => this.handleChange(e)}></input>Remember Me
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Login" className="btn float-right login_btn"></input>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    <Link to="register">  Don't have an account? </Link>
                                </div>
                                <div className="d-flex justify-content-center">
                                    Forgot your password?
                                    {/* <a href="#"></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)