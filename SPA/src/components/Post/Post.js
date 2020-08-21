import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../redux/actions/postActions';
import './Post.css';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalRecords: "",
            pageSize: 5,
            totalPages: "",
            currentPage: 1,
            pagesToShow: 5,
            startIndex: "",
            endIndex: ""
        };
    }

    async componentDidMount() {
        var postId = this.props.match.params.postId;
        await this.props.getPost(postId);

        this.setState({
            totalRecords: this.props.post.replies.length,
            totalPages: Math.ceil(this.props.post.replies.length / this.state.pageSize),
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.totalRecords !== prevState.totalRecords ||
            this.state.pageSize !== prevState.pageSize
        ) {
            this.setPage(this.state.currentPage);
        }
    }

    setPage(page) {
        var { totalRecords, pageSize, totalPages } = this.state;

        if (page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }

        this.setState({
            currentPage: page
        });

        var startIndex = (page - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalRecords - 1);

        this.setState({
            currentPage: page,
            startIndex: startIndex,
            endIndex: endIndex
        });
    }


    getPager() {
        var { pagesToShow, currentPage, totalPages } = this.state;
        var pages = [],
            startFromNumber;

        if (totalPages <= pagesToShow) {
            startFromNumber = 1;
            pagesToShow = totalPages;
        } else {
            if (currentPage <= Math.ceil(pagesToShow / 2)) {
                startFromNumber = 1;
            } else if (
                currentPage + Math.floor((pagesToShow - 1) / 2) >=
                totalPages
            ) {
                startFromNumber = totalPages - (pagesToShow - 1);
            } else {
                startFromNumber = currentPage - Math.floor(pagesToShow / 2);
            }
        }

        for (let i = 1; i <= pagesToShow; i++) {
            pages.push(startFromNumber++);
        }

        return {
            currentPage,
            totalPages,
            pages
        };
    }

    isActive(date) {
        var now = new Date();
        var lastActive = new Date(date);

        var diff = now.getTime() - lastActive.getTime();
        var minutes = Math.floor(diff / 1000 / 60);

        if (minutes < 10) {
            return <span className="dot" style={{ backgroundColor: "yellowgreen" }}></span>;
        }
        return <span className="dot" style={{ backgroundColor: "grey" }}></span>;
    }

    render() {
        var {
            startIndex,
            endIndex
        } = this.state;
        //console.log(this.props.post)

        var pager = this.getPager();
        var replies = [];
        if (this.props.post.replies)
            replies = this.props.post.replies.slice(startIndex, endIndex + 1);
        return (
            <div>
                {this.props.post.forum ?
                    <div className="row postHeader">
                        <div className="postHeading">
                            <span className="postIndexTitle">
                                {this.props.post.title}
                            </span>
                            <span id="headingBtn">
                                <Link className="btn btn-back" to={"/forum/" + this.props.post.forum.id}>Back to {this.props.post.forum.title}</Link>
                            </span>
                        </div>
                    </div>
                    : ""}
                {
                    this.props.post.user ? <div className="row" id="postIndexContent">
                        <div className="col-md-3 postAuthorContainer">
                            <img className="postAuthorImage" src={this.props.post.user.profileImageUrl || require('../../assets/image/default-profile.png')} alt="" />
                            <p>
                                <Link to={"/profile/" + this.props.post.user.id}>{this.props.post.user.userName}</Link>
                                <span style={{ color: "orange", marginLeft: "10px" }}>{this.isActive(this.props.post.user.lastActive)}</span>
                            </p>
                            <ul className="smaller roleUl" style={{ fontWeight: "bold" }}>{this.props.post.user.roleNames.map(role => (
                                <li key={role} className="roleli">{role}</li>
                            ))}</ul>
                            <div className="authorDetail smaller">
                                <p>Member Since: <Moment format="DD/MM/YYYY">{this.props.post.user.memberSince}</Moment></p>
                                <p>Rating: ({this.props.post.user.rating}) </p>
                                <span className="postDate"><Moment format="YYYY/MM/DD HH:mm">{this.props.post.created}</Moment></span></div>

                        </div>
                        <div className="col-md-9 postContentContainer">
                            <div className="postContent">
                                {this.props.post.content}
                            </div>
                        </div>
                    </div> : <p>No post</p>
                }
                <div className="row" id="replyDivider"></div>

                {this.props.isAuthenticated ?
                    <div className="row" id="postReplyRow">
                        <span>
                            <Link to={"/createreply/" + this.props.post.id} className="btn btn-newReply">
                                Post Reply
                </Link>
                        </span>
                    </div> : ""
                }

                {this.props.post.replies ?
                    this.props.post.replies.length > 0 ?
                        replies.map(reply => (
                            <div className="row replyContent" key={reply.id}>
                                <div className="col-md-3 replyAuthorContainer">
                                    <img className="postAuthorImage" src={reply.user.profileImageUrl || require('../../assets/image/default-profile.png')} alt=""></img>
                                    <p>
                                        <Link to={"/profile/" + reply.user.id}>{reply.user.userName}</Link>
                                        <span style={{ color: "orange", marginLeft: "10px" }}>{this.isActive(reply.user.lastActive)}</span>
                                    </p>
                                    <ul className="smaller roleUl" style={{ fontWeight: "bold" }}>{reply.user.roleNames.map(role => (
                                        <li key={role} className="roleli">{role}</li>
                                    ))}</ul>
                                    <div className="authorDetail smaller">
                                        <p>Member Since: <Moment format="DD/MM/YYYY">{reply.user.memberSince}</Moment></p>
                                        <p>Rating: ({reply.user.rating})</p>
                                        <span className="postDate"><Moment format="YYYY/MM/DD HH:mm">{reply.created}</Moment></span>
                                    </div>

                                </div>
                                <div className="col-md-9 replyContentContainer">
                                    <div className="postContent">
                                        {reply.content}
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <div className="noPosts">
                            <h3>
                                There are no replies to this post.<br />
                            </h3>
                        </div> : ""
                }

                <ul className="pagination">
                    <li>
                        <button
                            disabled={pager.currentPage === 1 ? true : false}
                            onClick={() => this.setPage(1)}>
                            First
          </button>
                    </li>
                    <li>
                        <button
                            disabled={pager.currentPage === 1 ? true : false}
                            onClick={() => this.setPage(pager.currentPage - 1)}>
                            Previous
          </button>
                    </li>
                    {pager.pages.map((page, index) => (
                        <li key={index}>
                            <button
                                className={pager.currentPage === page ? "active" : ""}
                                onClick={() => this.setPage(page)}>
                                {page}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            disabled={pager.currentPage === pager.totalPages ? true : false}
                            onClick={() => this.setPage(pager.currentPage + 1)}>
                            Next
          </button>
                    </li>
                    <li>
                        <button
                            disabled={pager.currentPage === pager.totalPages ? true : false}
                            onClick={() => this.setPage(pager.totalPages)}>
                            Last
          </button>
                    </li>
                </ul>
            </div >
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
    getPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);