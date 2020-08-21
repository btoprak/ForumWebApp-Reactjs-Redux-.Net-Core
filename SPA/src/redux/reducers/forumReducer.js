import {
    GET_FORUMS, GET_FORUM, CREATE_FORUM
} from "../actions/actionTypes"
import { updateObject } from "../../utility/updateObject";

const initState = {
    forum: [],
    forums: [],
    forumTopics: [],
    loading: false,
}

const getForumsSuccess = (state, action) => {
    return updateObject(state, {
        forums: action.payload,
    });
};
const getForumTopicsSuccess = (state, action) => {
    return updateObject(state, {
        forumTopics: action.payload,
    });
};

const createForumSuccess = (state, action) => {
    return updateObject(state, {
        forum: action.payload,
    });
};


export default function forumReducer(state = initState, action) {
    switch (action.type) {
        case GET_FORUMS:
            return getForumsSuccess(state, action);
        case GET_FORUM:
            return getForumTopicsSuccess(state, action);
        case CREATE_FORUM:
            return createForumSuccess(state, action);
        default:
            return state;
    }
}