import actionCreators from "./actionCreators";
import axios from "../../axios";

export const getProfileDetails = (id) => {
    return dispatch => {
        axios.get(`/api/v1/employees/profile/${id}/`)
            .then(response => {
                dispatch(actionCreators.profileDetailsLoaded(response.data));
            })
            .catch(error => {
                console.error(error);
                dispatch(actionCreators.profileDetailsError());
            });
    };
};

export const editGeneralInfo = (id, data) => {
    return dispatch => {
        axios.put(`/api/v1/employees/${id}/`, data)
            .then(response => {
                dispatch(actionCreators.generalInfoUpdated(response.data));
            })
            .catch(error => {
                console.error(error);
                dispatch(actionCreators.profileDetailsError());
            });
    };
};

export const getSkills = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/v1/employees/skills/');
        dispatch(actionCreators.skillsLoad(response.data.results));
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};

export const setEmployeeSkill = (id, skills) => async dispatch => {
    try {
        const response = await axios.post(`/api/v1/employees/${id}/skills/`, skills);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const editGoal = (review_id, goal_id, data) => {
    return dispatch => {
        axios.put(`/api/v1/reviews/${review_id}/goals/${goal_id}/`, data)
            .then(response => {
                dispatch(actionCreators.goalUpdated(response.data));
            })
            .catch(error => {
                console.error(error);
                dispatch(actionCreators.profileDetailsError());
            });
    };
}