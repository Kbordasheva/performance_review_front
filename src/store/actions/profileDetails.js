import actionCreators from "./actionCreators";
import axios from "../../axios";

export const getProfileDetails = (id) => {
    return dispatch => {
        axios.get(`/api/v1/reviews/${id}/`)
            .then(response => {
                dispatch(actionCreators.profileDetailsLoaded(response.data));
            })
            .catch(error => {
                console.error(error);
                dispatch(actionCreators.profileDetailsError());
            });
    };
};