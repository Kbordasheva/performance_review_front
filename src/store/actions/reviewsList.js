import axios from "../../axios";
import queryString from "query-string"
import actionCreators from "./actionCreators";


export const getReviewsList = (nextLink) => {
  return dispatch => {

    const link = nextLink?.slice(nextLink.indexOf('?'), nextLink.length);
    const params = queryString.parse(link);

    axios.get(`/api/v1/employees/`, {params})
      .then(response => {
        dispatch(actionCreators.reviewListUpdated(response.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(actionCreators.reviewListError());
      });
  };
};
