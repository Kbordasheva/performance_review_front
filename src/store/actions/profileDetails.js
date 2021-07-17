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

export const editGoal = async (review_id, goal_id, data) => {
    try {
        const response = axios.put(`/api/v1/reviews/${review_id}/goals/${goal_id}/`, data);
        return response.data;
    } catch (error) {
        console.error((error));
    }
};

export const addGoal = async (id, data) => {
    try {
        const response = await axios.post(`/api/v1/reviews/${id}/goals/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const editComments = async (reviewId, goalId, commentId, info) => {
    try {
        const response = await axios.put(`/api/v1/reviews/${reviewId}/goals/${goalId}/comments/${commentId}/`, info);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addComments = async (reviewId, goalId, info) => {
    try {
        const response = await axios.post(`/api/v1/reviews/${reviewId}/goals/${goalId}/comments/`, info);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const editAllGoals = (goals, reviewId) => {
    return dispatch => {
        const goalsPromises = goals.map((item) => {
            return editGoal(reviewId, item.id, {
                ...item,
            })
                .then(async (response) => {
                    const commentsPromise = item.comments.map((comment) => {
                        if (comment) {
                            if (comment.id) {
                                return editComments(reviewId, item.id, comment.id, { ...comment });
                            } else {
                                return addComments(reviewId, item.id, { ...comment });
                            }
                        }
                        else return null
                    });
                    return { ...response, notes: await Promise.all(commentsPromise) }
                })
        })
        return Promise.all(goalsPromises).then((responses) => {
            responses.forEach((goalsInfo) => {
                dispatch(actionCreators.goalUpdate(goalsInfo));
            })
        })
    }
}

export const addAllGoals = (goals, reviewId) => {
    return dispatch => {
        const goalsPromises = goals.map((item) => {
            return addGoal(reviewId, {
                ...item,
            })
                .then(async (response) => {
                    const commentsPromise = item.comments.map((comment) => {
                        if (comment) {
                            return  addComments(response.id, {...comment})
                        }
                        else return null
                    });
                    return { ...response, notes: await Promise.all(commentsPromise) }
                })
        })
        return Promise.all(goalsPromises).then((responses) => {
            responses.forEach((item) => {
                dispatch(actionCreators.goalAdd(item));
            })
        })
    }
}