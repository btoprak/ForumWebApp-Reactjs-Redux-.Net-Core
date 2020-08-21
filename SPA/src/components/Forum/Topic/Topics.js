import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForumTopics } from '../../../redux/actions/forumActions';
import './Topics.css'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: "" };

        this.searchResult = this.searchResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        // console.log(this.state);
    }

    componentDidMount() {
        const forumId = this.props.match.params.forumId;
        this.props.getForumTopics(forumId, this.state.searchQuery);
    }

    searchResult(e) {
        e.preventDefault();
        const forumId = this.props.match.params.forumId;
        this.props.getForumTopics(forumId, this.state.searchQuery);
    }

    render() {
        // console.log(this.props.forumTopics);
        return (
            <div>
                <div className="row sectionHeader">
                    <div className="sectionHeading">
                        <span>{this.props.forumTopics.title} Forum</span>
                        {this.props.isAuthenticated ?
                            <span id="headingBtn">
                                <Link className="btn btn-success" to={{
                                    pathname: "/createtopic/" + this.props.forumTopics.id,
                                    query: { forum: JSON.stringify(this.props.forumTopics) }
                                }}>Create Post</Link>
                            </span> : ""
                        }
                        <form onSubmit={this.searchResult}>
                            <div className="searchForm">
                                <input type="text" placeholder="Search..." name="searchQuery" className="searchBar" onChange={this.handleChange} />
                                <button type="submit" className="btn btn-forumSearch">
                                    <i className="material-icons" style={{ color: "white" }}>search</i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="sectionDescription">
                        <img className="forumLogo" src={this.props.forumTopics.imageUrl} alt={this.props.forumTopics.title}></img>
                        <p>Welcome to the {this.props.forumTopics.title} forum.Please keep posts friendly and on-topic.</p>
                        {!this.props.isAuthenticated ? <div>
                            <p><span>You must be a <Link to="/register"> register member </Link> to create a new post.</span></p></div>
                            : ""
                        }
                    </div>
                </div>
                <div className="row forumIndexContent">
                    {this.props.forumTopics.posts ? this.props.forumTopics.posts.length > 0 ?
                        <table className="table table-hover table-bordered" id="topicIndexTable">
                            <tbody>
                                {this.props.forumTopics.posts.map(post => (
                                    <tr key={post.id}>
                                        <td style={{ width: "50%" }}>
                                            <div className="postData">
                                                <div className="postTitle">
                                                    <Link to={{
                                                        pathname: "/post/" + post.id,
                                                        query: { forum: JSON.stringify(this.props.forumTopics) }
                                                    }}>{post.title}</Link>
                                                </div>
                                                <div className="forumSubTitle">
                                                    <div>
                                                        <span className="postAuthor">
                                                            {post.user.userName}
                                                        </span>
                                                        ({post.user.rating})
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <div className="forumPostCount">
                                                Replies: {post.replies.length}
                                            </div>
                                        </td>
                                        <td>
                                            {post.replies.length > 0 ?
                                                <div>
                                                    <span className="postDate">last Post by: <Link to={"/profile/" + post.replies[post.replies.length - 1].user.id}>{post.replies[post.replies.length - 1].user.userName}</Link></span>
                                                    <span className="postDate"> on:<Moment format="YYYY/MM/DD HH:mm">{post.replies[post.replies.length - 1].created}</Moment></span></div>
                                                : <div className="postDate">No reply in this post</div>}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> : <div className="noPosts">
                            <i className="material-icons md-72">question_answer</i>
                            <h3>
                                It look like there are no posts to be found.
                    Why not <Link to={{
                                    pathname: "/createtopic/" + this.props.forumTopics.id,
                                    query: { forum: JSON.stringify(this.props.forumTopics) }
                                }}><span>Post </span></Link>
                    Something?
                </h3>
                        </div> : ""
                    }
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        authUser: state.authReducer.user,
        forumTopics: state.forumReducer.forumTopics
    };
};

const mapDispatchToProps = {
    getForumTopics
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);