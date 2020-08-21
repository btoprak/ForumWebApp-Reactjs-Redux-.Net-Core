import {
    CREATE_POST, GET_POST, GET_LASTEST_POSTS, SEARCH_POST_SUCCESS
} from "../actions/actionTypes"
import { updateObject } from "../../utility/updateObject";


const initState = {
    post: [],
    searchedPosts: [],
    lastestPosts: []
}


const createPostSuccess = (state, action) => {
    return updateObject(state, {
        post: action.payload,
    });
};

const getPostSuccess = (state, action) => {
    return updateObject(state, {
        post: action.payload,
    });
};

const getLastestPostsSuccess = (state, action) => {
    return updateObject(state, {
        lastestPosts: action.payload,
    });
};

const searchPostsSuccess = (state, action) => {
    return updateObject(state, {
        searchedPosts: action.payload,
    });
};



export default function postReducer(state = initState, action) {
    switch (action.type) {
        case CREATE_POST:
            return createPostSuccess(state, action);
        case GET_POST:
            return getPostSuccess(state, action);
        case GET_LASTEST_POSTS:
            return getLastestPostsSuccess(state, action);
        case SEARCH_POST_SUCCESS:
            return searchPostsSuccess(state, action);
        default:
            return state;
    }
}