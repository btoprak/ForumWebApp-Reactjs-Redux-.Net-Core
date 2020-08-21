import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchPost } from '../../../redux/actions/postActions';
import queryString from 'query-string';
import './SearchPostResult.css'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class SearchPostResult extends Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: "" };


        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        this.setState({ searchQuery: params.searchQuery });
        this.props.searchPost(params.searchQuery)
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.props.searchPost(this.state.searchQuery)
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        // console.log(this.state);
    }

    render() {
        console.log(this.props.searchedPosts);
        return (
            <div>
                <div className="row sectionHeader">
                    <div className="sectionHeading">
                        <span>Search Results for:@Model.SearchQuery</span>
                        <form>
                            <div className="searchForm">
                                <input type="text" placeholder="Search..." name="searchQuery" className="searchBar" onChange={this.handleChange} />
                                <button type="submit" className="btn btn-forumSearch">
                                    <i className="material-icons">search</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {this.props.searchedPosts.length > 0 ?
                        <table className="table table-hover table-bordered" id="searchIndexTable">
                            <tbody>

                                {this.props.searchedPosts.map(post => (
                                    <tr key={post.id}>
                                        <td>
                                            <img className="forumLogo" src={post.forum.imageUrl} alt={post.forum.title} style={{ width: "35px", height: "35px" }}></img>
                                            <div className="postData">
                                                <div className="postTitle">
                                                    <Link to={"/post/" + post.id}>{post.title}</Link>
                                                </div>
                                                <div className="forumSubTitle">
                                                    <div>
                                                        Started by:
                                                    <span className="postAuthor">
                                                            <Link to={"/profile/" + post.user.id}>
                                                                {post.user.userName}
                                                            </Link>
                                                        ({post.user.rating})
                                                    </span>
                                                    in:
                                                    <span className="postForum">
                                                            <Link to={"/forum/" + post.forum.id}>{post.forum.title}</Link>
                                                        </span>
                                                    on:
                                                    <span className="postDate">
                                                            <Moment format="YYYY/MM/DD HH:mm">{post.created}</Moment>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
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
                        </table>
                        :
                        <div className="noPosts">
                            <i className="material-icons md-72">question_answer</i>
                            <h3>
                                No search results found for @Model.SearchQuery <br />
                            </h3>
                        </div>
                    }
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        searchedPosts: state.postReducer.searchedPosts
    };
};

const mapDispatchToProps = {
    searchPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPostResult);