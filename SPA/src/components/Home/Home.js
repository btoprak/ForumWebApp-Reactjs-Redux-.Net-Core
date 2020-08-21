import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLastestPosts } from '../../redux/actions/postActions';
import './Home.css'
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: "" };

        this.searchPost = this.searchPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        // console.log(this.state);
    }

    searchPost() {
        this.props.history.push({
            pathname: '/searchpostresult',
            search: '?searchQuery=' + this.state.searchQuery
        })
    }

    componentDidMount() {
        this.props.getLastestPosts();
    }
    render() {
        //console.log(this.props.lastestPosts);

        return (
            <div>
                <div className="row frontPageSplash">
                    <div className="col-md-6 frontPageLearn">
                        <div className="frontPageHeading">Learn,Collaborate,Share Knowledge</div>
                        <p className="frontPageSubHeading">Lambda Forums is the world's fastest growing coding forum</p>
                        <div>
                            <form onSubmit={this.searchPost}>
                                <input type="text" className="homeSearch" placeholder="Search..." name="searchQuery" onChange={this.handleChange} />
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                </div>
                <div className="row frontPageContent">
                    <h3 id="latestPosts">Latest Posts</h3>
                    <table className="table table-hover" id="latestPostsTable">
                        <tbody>
                            {this.props.lastestPosts.map(post => (
                                <tr key={post.id}>
                                    <td>
                                        <img className="forumLogo" src={post.forum.imageUrl} alt={post.forum.title}></img>
                                        <div className="postTitle">
                                            <Link to={"/post/" + post.id}>
                                                {post.title}
                                            </Link>
                                        </div>
                                        <div className="postSubTitle">
                                            {post.replies.length > 0 ?
                                                post.replies.length === 1 ?
                                                    <span>{post.replies.length} Reply</span>
                                                    : <span>{post.replies.length} Replies</span>
                                                : <span>No Replies</span>}
                                            <span className="postUser">
                                                <Link to={"/profile/" + post.user.id}>
                                                    {"  " + post.user.userName}
                                                </Link>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        lastestPosts: state.postReducer.lastestPosts
    };
};

const mapDispatchToProps = {
    getLastestPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);