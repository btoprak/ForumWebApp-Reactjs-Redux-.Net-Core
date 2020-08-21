import axios from 'axios'
import { CREATE_POST, GET_POST, GET_LASTEST_POSTS, SEARCH_POST_SUCCESS } from './actionTypes'
import alertify from 'alertifyjs'


export function createPostSuccess(post) {
    return { type: CREATE_POST, payload: post }
}

export function getPostSuccess(post) {
    return { type: GET_POST, payload: post }
}

export function getLastestPostsSuccess(posts) {
    return { type: GET_LASTEST_POSTS, payload: posts }
}

export function searchPostSuccess(posts) {
    return { type: SEARCH_POST_SUCCESS, payload: posts }
}


export function getPost(postId) {
    return function (dispatch) {
        return axios.get('http://localhost:58152/api/posts/' + postId
        )
            .then(({ data }) => {
                dispatch(getPostSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function createPost(post) {
    return function (dispatch) {
        return axios.post('http://localhost:58152/api/posts', post
        )
            .then(({ data }) => {
                dispatch(createPostSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function getLastestPosts() {
    return function (dispatch) {
        return axios.get('http://localhost:58152/api/posts/getlastestposts'
        )
            .then(({ data }) => {
                dispatch(getLastestPostsSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}


export function searchPost(searchQuery) {
    return function (dispatch) {
        return axios.get('http://localhost:58152/api/posts/searchpost', {
            params: {
                searchQuery: searchQuery
            }
        }
        )
            .then(({ data }) => {
                dispatch(searchPostSuccess(data));
            })
            .catch(err => alertify.error("Error"));
    }
}