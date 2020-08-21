import axios from 'axios'
import { GET_USER_DETAIL, UPDATE_USER_PHOTO } from './actionTypes'
import alertify from 'alertifyjs'



export function getUserDetailSuccess(user) {
    return { type: GET_USER_DETAIL, payload: user }
}

export function updateUserProfilePhotoSuccess(forum) {
    return { type: UPDATE_USER_PHOTO, payload: forum }
}

export function getUserDetail(userId) {
    return function (dispatch) {
        return axios.get('http://localhost:58152/api/profiles/' + userId
        )
            .then(({ data }) => {
                dispatch(getUserDetailSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function updateUserProfilePhoto(file) {
    var formData = new FormData();
    formData.append("file", file);
    return function (dispatch) {
        return axios.post('http://localhost:58152/api/profiles', formData, {
            headers: { "Content-Type": 'multipart/form-data' }
        }
        )
            .then(({ data }) => {
                dispatch(updateUserProfilePhotoSuccess(data));
                window.location.reload(false);
            })
            .catch(err => alertify.error("Error"));
    }
}