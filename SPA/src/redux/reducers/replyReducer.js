import {
    CREATE_POST_REPLY
} from "../actions/actionTypes"
import { updateObject } from "../../utility/updateObject";

const initState = {
    reply: []
}


const createPostReplySuccess = (state, action) => {
    return updateObject(state, {
        reply: action.payload,
    });
};

export default function replyReducer(state = initState, action) {
    switch (action.type) {
        case CREATE_POST_REPLY:
            return createPostReplySuccess(state, action);
        default:
            return state;
    }
}