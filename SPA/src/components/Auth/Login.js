import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'
import alertify from 'alertifyjs';



class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            user: {},
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(field, e) {
        // const { name, value } = e.target;
        // this.setState({ [name]: value });

        let user = this.state.user;
        user[field] = e.target.value;
        this.setState({ user });
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

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            const { username, password } = this.state.user;
            if (username && password) {
                //console.log(this.state.user)
                this.props.loginUser(this.props.history, this.state.user);
            }
        } else {
            console.log("hata");
        }
    }

    componentDidUpdate(prevProps, prevState) {
       
        if (prevProps.error !== this.props.error) {
            alertify.error(this.props.error.msg, 1);
        }
    }


    render() {

        const { isAuthenticated } = this.props;
        if (isAuthenticated)
            this.props.history.push('/');

        return (

            <div className="container">
                <h2 style={{ marginLeft: "17%", marginTop: "10%" }}>Login</h2>
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
                    <div className="form-group" style={{ marginLeft: "17%" }}>
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token != null,
        user: state.authReducer.user,
        loading: state.authReducer.loading,
        error: state.errorReducer
    }
}

export default connect(mapStateToProps, { loginUser })(Login)
