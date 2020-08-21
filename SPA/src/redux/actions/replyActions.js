import axios from 'axios'
import { CREATE_POST_REPLY } from './actionTypes'
import alertify from 'alertifyjs'

export function createPostReplySuccess(reply) {
    return { type: CREATE_POST_REPLY, payload: reply }
}

export function createPostReply(reply) {
    return function (dispatch) {
        return axios.post('http://localhost:58152/api/replies/', reply
        )
            .then(({ data }) => {
                dispatch(createPostReplySuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}