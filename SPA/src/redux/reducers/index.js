import { combineReducers } from 'redux'
import authReducer from './authReducer'
import forumReducer from './forumReducer'
import postReducer from './postReducer'
import replyReducer from './replyReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import errorReducer from './errorReducer';

export default combineReducers({
   authReducer: authReducer,
   forumReducer: forumReducer,
   postReducer: postReducer,
   replyReducer: replyReducer,
   userReducer: userReducer,
   adminReducer: adminReducer,
   errorReducer: errorReducer
});