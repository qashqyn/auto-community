import { combineReducers } from "redux";

import posts from './posts';
import videos from './videos';
import auth from './auth';

export default combineReducers({
    posts, auth, videos
});