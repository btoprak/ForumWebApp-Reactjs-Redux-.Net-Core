import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPostReply } from '../../../redux/actions/replyActions';
import { Link } from 'react-router-dom';
import "../Post.css"


class CreateReply extends Component {
    constructor(props) {
        super(props);
        this.state = { content: "" };

        this.createReply = this.createReply.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    async createReply(event) {
        var post = this.props.post
        event.preventDefault();
        var reply = {
            content: this.state.content,
            postId: post.id,
        }

        await this.props.createPostReply(reply);
        this.props.history.push(`/post/${post.id}`);

    }

    render() {
        var post = this.props.post
        //console.log(post);

        return (
            <div>
                <div className="row sectionHeader">
                    <div className="sectionHeading noBorder">
                        New Post | {post.title}
                        <img className="forumLogo" src={post.forum.imageUrl} alt={post.title}></img>
                        <span id="headingBtn">
                            <Link className="btn btn-danger" to={"/post/" + post.id}>
                                Back to {post.title}
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div id="originalPost">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="createPostSection">
                        <div className="authorBlock">
                            You're submitting this reply {post.user.userName}
                        </div>

                        <form onSubmit={this.createReply} id="addPostForm">
                            <div className="text-danger"></div>
                            <div className="form-group">
                                <label>Reply:</label>
                                <textarea name="content" rows="20" className="form-control" onChange={this.handleChange} placeholder="Your reply..."></textarea>
                            </div>
                            <button type="submit" id="submitReplyBtn" className="btn btn-submitPost">Submit Reply</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        authUser: state.authReducer.user,
        post: state.postReducer.post
    };
};

const mapDispatchToProps = {
    createPostReply,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReply);