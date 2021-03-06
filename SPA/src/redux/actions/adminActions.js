import {
    GET_USERS_WITH_ROLES, EDIT_ROLES
} from "./actionTypes";
import axios from 'axios';
import alertify from "alertifyjs";


export const getUsersWithRolesSuccess = (users) => {
    return { type: GET_USERS_WITH_ROLES, payload: users }
}

export const updateRolesSuccess = (roles) => {
    return { type: EDIT_ROLES, payload: roles }
}


export function getUsersWithRoles() {
    return function (dispatch) {
        return axios.get('http://localhost:58152/api/admin/usersWithRoles'
        )
            .then(({ data }) => {
                dispatch(getUsersWithRolesSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function updateRoles(user, roles) {
    return function (dispatch) {
        return axios.post('http://localhost:58152/api/admin/editRoles/' + user.userName, roles
        )
            .then(({ data }) => {
                dispatch(updateRolesSuccess(roles))
            })
            .catch(err => alertify.error("Error"));
    }
}