import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForums } from '../../redux/actions/forumActions';
import './Forum.css'
import { Link } from 'react-router-dom';


class Forum extends Component {

    componentDidMount() {
        this.props.getForums();
    }

    render() {
        //console.log(this.props.forums)
        return (
            <div>
                <div className="row sectionHeader">
                    <div className="sectionHeading">Browse Forums</div>
                    <div className="sectionDescription">
                        <p>Welcome to <strong>Lambda Forums community</strong>. Posts are broadly categorized into separate forums by programming language or area of interest.</p>
                        <p>
                            Please read the Forum Guidelines before creating a new post.
                {!this.props.isAuthenticated ?
                                <span style={{ color: "orange" }}> You must be a<Link to="/register"> registered </Link> member to create a new post.</span>
                                : ""}
                        </p>
                    </div>
                </div>
                <div className="row" id="forumIndexContent">
                    <table className="table table-hover" id="forumIndexTable">
                        <tbody>
                            {this.props.forums.map(forum => (
                                <tr key={forum.id}>
                                    <td>
                                        <img className="forumLogo" src={forum.imageUrl} alt={forum.title}></img>
                                        <div className="forumData">
                                            <div className="forumTitle">
                                                <Link to={"/forum/" + forum.id}>{forum.title}</Link>
                                            </div>
                                            <div className="forumSubTitle">
                                                {forum.hasRecentPost ?
                                                    <div className="hasRecentPost">Hot</div> : ""}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="forumPostCount">
                                            {forum.posts.length} Posts
                            </div>
                                        <div className="forumMemberCount">
                                            {forum.numberOfUsers} Users
                            </div>
                                    </td>
                                    <td style={{ "width": "70%" }}>
                                        <div className="forumDescription">
                                            {forum.description}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        forums: state.forumReducer.forums,
        authUser: state.authReducer.user
    };
};

const mapDispatchToProps = {
    getForums
};

export default connect(mapStateToProps, mapDispatchToProps)(Forum);