import {combineReducers} from "redux";

import auth from "./auth";
import reviewList from "./reviewList";

export default combineReducers({
    auth,
    reviewList

});