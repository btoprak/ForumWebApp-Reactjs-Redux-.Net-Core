import {
    GET_USERS_WITH_ROLES
} from "../actions/actionTypes"
import { updateObject } from "../../utility/updateObject";

const initState = {
    usersWithRoles: []
}

const getUsersWithRoles = (state, action) => {
    return updateObject(state, {
        usersWithRoles: action.payload,
    });
};


export default function adminReducer(state = initState, action) {
    switch (action.type) {
        case GET_USERS_WITH_ROLES:
            return getUsersWithRoles(state, action);
        default:
            return state;
    }
}