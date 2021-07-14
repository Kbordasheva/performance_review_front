import {combineReducers} from "redux";

import auth from "./auth";
import reviewList from "./reviewList";
import profile from "./profileDetails"

export default combineReducers({
    auth,
    reviewList,
    profile,
});