import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createForum } from '../../redux/actions/forumActions';


class CreateForum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            selectedImageFile: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
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

        var forum = {
            title: this.state.title,
            description: this.state.description,
            file: file
        }
        console.log(forum);
        this.props.createForum(this.props.history, forum);
        //this.props.history.push("/forum");
    }

    render() {
        return (
            <div>
                <div className="row sectionHeader">
                    <div className="sectionHeading">
                        Create New Forum
                </div>
                </div>
                <div>
                    <div id="createForumSection">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label >Forum Title</label>
                                <input type="text" className="form-control" name="title" placeholder="Choose forum title" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Forum Description</label>
                                <input type="text" className="form-control" name="description" placeholder="Write a brief description of the forum topic" onChange={this.handleChange} />
                            </div>
                            <div id="upload">
                                <label>Upload Forum Image</label>
                                <br />
                                <label className="btn btn-default btn-file">
                                    Browse <input type="file" style={{ display: "none" }} onChange={this.fileSelectedHandler} />
                                </label>
                            </div>
                            <button type="submit" id="newFormBtn" className="btn btn-submitPost">Create Forum</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = {
    createForum,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForum);