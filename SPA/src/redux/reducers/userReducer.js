import {
    GET_USER_DETAIL
} from "../actions/actionTypes"
import { updateObject } from "../../utility/updateObject";

const initState = {
    user: null
}

const getUserDetailSuccess = (state, action) => {
    return updateObject(state, {
        user: action.payload,
    });
};

export default function replyReducer(state = initState, action) {
    switch (action.type) {
        case GET_USER_DETAIL:
            return getUserDetailSuccess(state, action);
        default:
            return state;
    }
}
