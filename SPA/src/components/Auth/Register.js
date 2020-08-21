import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
import './Auth.css'
import alertify from 'alertifyjs';


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation() {
        let user = this.state.user;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!user["username"]) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }

        if (typeof user["username"] !== "undefined") {
            if (!user["username"].match(/^[a-zA-Z0-9]+$/)) {
                formIsValid = false;
                errors["username"] = "Only letters and numbers";
            }
        }

        //password
        if (!user["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        //confirm password
        if (!user["confirmpassword"]) {
            formIsValid = false;
            errors["confirmpassword"] = "Cannot be empty";
        }

        if (typeof user["confirmpassword"] !== "undefined") {
            if (user["confirmpassword"] !== user["password"]) {
                formIsValid = false;
                errors["confirmpassword"] = "Passwords must match";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    handleChange(field, e) {
        let user = this.state.user;
        user[field] = e.target.value;
        this.setState({ user });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            const { username, password } = this.state.user;
            if (username && password) {
                console.log(this.state.user)
                this.props.registerUser(this.props.history, this.state.user)
            }
        } else {
            console.log("hata");
        }
    }

    componentDidUpdate(prevProps, prevState) {
    
        if (prevProps.error !== this.props.error) {
            alertify.error(this.props.error.msg, 2);
        }
    }

    render() {
        return (
            <div className="container">
                <h2 style={{ marginLeft: "17%", marginTop: "10%" }}>Register</h2>
                <form className="form-horizontal" name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group row'>
                        <label className="control-label col-sm-2" htmlFor="username">Username:</label>
                        <div className="col-sm-6">
                            <input id="username" type="text" className="form-control" name="username" value={this.state.user["username"] || ""} onChange={this.handleChange.bind(this, "username")} />
                            <span className="error">{this.state.errors["username"]}</span>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label className="control-label col-sm-2" htmlFor="password">Password:</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control" name="password" value={this.state.user["password"] || ""} onChange={this.handleChange.bind(this, "password")} />
                            <span className="error" color="red">{this.state.errors["password"]}</span>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label className="control-label col-sm-2" htmlFor="confirmpassword">Confirm Password:</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control" name="confirmpassword" value={this.state.user["confirmpassword"] || ""} onChange={this.handleChange.bind(this, "confirmpassword")} />
                            <span className="error">{this.state.errors["confirmpassword"]}</span>
                        </div>
                    </div>
                    <div className="form-group" style={{ marginLeft: "17%" }}>
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    error: state.errorReducer
})

export default connect(mapStateToProps, { registerUser })(Register)