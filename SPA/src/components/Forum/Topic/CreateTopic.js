import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../../redux/actions/postActions';
import "./Topics.css"
import { Link } from 'react-router-dom';

class CreateTopic extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", content: "" };

        this.createPost = this.createPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    async createPost(event) {
        var forum = this.props.forumTopics
        event.preventDefault();
        var post = {
            forum: forum,
            title: this.state.title,
            content: this.state.content
        }

        await this.props.createPost(post);
        this.props.history.push(`/forum/${forum.id}`);

    }
    render() {
        var forum = this.props.forumTopics

        //console.log(this.props.forumTopics);
        return (
            <div>
                <div className="row sectionHeader">
                    <div className="sectionHeading noBorder">
                        New Post | {forum.title}
                        <img className="forumLogo" src={forum.imageUrl} alt={forum.title}></img>
                        <span id="headingBtn">
                            <Link className="btn btn-danger" to={"/forum/" + forum.id}>
                                Back to {forum.title}
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="createPostSection">
                        <div className="authorBlock">
                            You're submitting to post as <strong>{this.props.authUser.userName}</strong>
                        </div>
                        <form onSubmit={this.createPost}>
                            <div className="form-group">
                                <label >Title:</label>
                                <input type="text" name="title" className="form-control" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Content:</label>
                                <textarea name="content" className="form-control" rows="20" onChange={this.handleChange}></textarea>
                            </div>
                            <button type="submit" id="submitPostBtn" className="btn btn-submitPost">Submit Post</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authReducer.user,
        forumTopics: state.forumReducer.forumTopics
    };
};

const mapDispatchToProps = {
    createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic);