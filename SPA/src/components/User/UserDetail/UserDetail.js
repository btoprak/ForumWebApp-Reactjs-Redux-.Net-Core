import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserDetail, updateUserProfilePhoto } from '../../../redux/actions/userActions';
import "./UserDetail.css"
import Moment from 'react-moment';


class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedImageFile: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var userId = this.props.match.params.userId;
        this.props.getUserDetail(userId);
    }

    fileSelectedHandler = e => {
        e.preventDefault();
        this.setState({
            selectedImageFile: e.target.files[0]
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let file = this.state.selectedImageFile

        // console.log(file);
        this.props.updateUserProfilePhoto(file);
    }

    render() {
        // console.log(this.props.user);

        return (
            <div >
                <div className="row sectionHeader">
                    <div className="sectionHeading">
                        User Profiles
                    </div>
                </div>
                {this.props.user ?
                    <div className="row userProfile">
                        <div className="col-md-4">
                            <div></div>
                            <img id="userProfileImage" src={this.props.user.profileImageUrl || require('../../../assets/image/default-profile.png')} alt=""></img>
                            {this.props.user.id === this.props.authUser.id ?
                                <form onSubmit={this.handleSubmit}>
                                    <div id="upload">
                                        <label className="btn btn-default btn-file">
                                            Browse<input type="file" name="file" style={{ display: "none" }} onChange={this.fileSelectedHandler} />
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                : ""}
                        </div>
                        <div className="col-md-8">
                            <span id="userName">{this.props.user.userName}</span>
                            <ul className="isAdmin" style={{ listStyleType: "none", margin: 0, padding: 0, overflow: "hidden" }}>{this.props.user.roleNames.map(role => (
                                <li key={role} style={{ float: "left", margin: "5px" }}>{role}</li>
                            ))}</ul>
                            <span id="userRating"><b>Current Rating:</b> {this.props.user.rating}</span>
                            <span id="userEmailLabel"><b>Email:</b> {this.props.user.email}</span>
                            <span id="userCreatedLabel"><b>Member Since:</b> <Moment format="DD/MM/YYYY">{this.props.user.memberSince}</Moment></span>
                        </div>
                    </div>
                    : ""}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authReducer.user,
        user: state.userReducer.user
    };
};

const mapDispatchToProps = {
    getUserDetail,
    updateUserProfilePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);