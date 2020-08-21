import axios from 'axios'
import { GET_FORUMS, GET_FORUM, CREATE_FORUM } from './actionTypes'
import alertify from 'alertifyjs'

export function getForumsSuccess(forums) {
    return { type: GET_FORUMS, payload: forums }
}

export function getForumTopicsSuccess(forum) {
    return { type: GET_FORUM, payload: forum }
}

export function createForumSuccess(forum) {
    return { type: CREATE_FORUM, payload: forum }
}


export function getForums() {
    return function (dispatch) {
        return axios.get('http://localhost:58152/api/forums/'
        )
            .then(({ data }) => {
                dispatch(getForumsSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function getForumTopics(id, searchQuery) {
    return function (dispatch) {
        return axios.get('http://localhost:58152/api/forums/' + id, {
            params: {
                searchQuery: searchQuery
            }
        }
        )
            .then(({ data }) => {
                dispatch(getForumTopicsSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function createForum(history, forum) {
    var formData = new FormData();
    formData.append("title", forum.title);
    formData.append("description", forum.description);
    formData.append("file", forum.file);
    return function (dispatch) {
        return axios.post('http://localhost:58152/api/forums', formData, {
            headers: { "Content-Type": 'multipart/form-data' }
        }
        )
            .then(({ data }) => {
                dispatch(createForumSuccess(data));
                history.push("/forum")
            })
            .catch(err => alertify.error("Error"));
    }
}