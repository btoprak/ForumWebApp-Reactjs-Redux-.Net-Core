import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_START } from "../actions/actionTypes";
import { updateObject } from "../../utility/updateObject";


const initState = {
    user: null,
    token: null,
    loading: false,
    authRedirectPath: '/'
}

const loginSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        error: null,
        loading: false
    })
}

const loginStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return loginStart(state, action);
        case LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case LOGIN_ERROR:
        case LOGOUT:
            return {
                token: null,
                authuser: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                authuser: action.user,
            };
        case REGISTER_ERROR:
        default:
            return state;
    }
}

export default authReducer;