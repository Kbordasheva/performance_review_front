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

export const setEmployeeSkill = async (id, skills) => {
    try {
        const response = await axios.put(`/api/v1/employees/${id}/skills/`, skills);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const editGoal = (review_id, goal_id, data) => {
    return dispatch => {
        return axios.put(`/api/v1/reviews/${review_id}/goals/${goal_id}/`, data)
          .then(response => {
              dispatch(actionCreators.goalUpdate(review_id, goal_id, response.data));
          })
          .catch(error => {
              console.error(error);
          })
    };
}

export const editGoalIsDone = (review_id, goal_id, employeeId, data) => {
    return dispatch => {
        return axios.put(`/api/v1/reviews/${review_id}/goals/${goal_id}/done/`, data)
          .then(response => {
              dispatch(actionCreators.goalIsDone(review_id, goal_id, response.data));
              dispatch(actionCreators.employeeGoalsDoneCount(employeeId, response.data));
          })
          .catch(error => {
              console.error(error);
          })
    }
    ;
}

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

export const addComments = (reviewId, goalId, info) => {
    return dispatch => {
        return axios.post(`/api/v1/reviews/${reviewId}/goals/${goalId}/comments/`, info)
          .then(response => {
              dispatch(actionCreators.commentAdd(response.data, reviewId, goalId));
              return response.data;
          })
          .catch(error => {
              console.error(error);
          })
    }
};

export const editCriteria = async (reviewId, goalId, criteriaId, info) => {
    try {
        const response = await axios.put(`/api/v1/reviews/${reviewId}/goals/${goalId}/criteria/${criteriaId}/`, info);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addCriteria = (reviewId, goalId, info) => {
    return dispatch => {
        return axios.post(`/api/v1/reviews/${reviewId}/goals/${goalId}/criteria/`, info)
          .then(response => {
              dispatch(actionCreators.criteriaAdd(response.data, reviewId, goalId));
              return response.data;
          })
          .catch(error => {
              console.error(error);
          })
    }
};

export const addReview = (data) => async dispatch => {
    try {
        const response = await axios.post(`/api/v1/reviews/`, data);
        dispatch(actionCreators.ReviewAdd(response.data))
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const editAllGoals = (goals, reviewId) => {
    return dispatch => {
        const goalsPromises = goals.map((item) => {
            return dispatch(editGoal(reviewId, item.id, {
                ...item,
            }))
                .then(async (response) => {
                    const commentsPromise = item.comments.map((comment) => {
                        if (comment) {
                            if (comment.id) {
                                return editComments(reviewId, item.id, comment.id, { ...comment });
                            } else {
                                return dispatch(addComments(reviewId, item.id, { ...comment }));
                            }
                        }
                        else return null
                    });
                    const criteriaPromise = item.criteria.map((criteria) => {
                        if (criteria) {
                            if (criteria.id) {
                                return editCriteria(reviewId, item.id, criteria.id, { ...criteria });
                            } else {
                                return dispatch(addCriteria(reviewId, item.id, { ...criteria }));
                            }
                        }
                        else return null
                    });
                    return { ...response,
                        comments: await Promise.all(commentsPromise),
                        criteria: await Promise.all(criteriaPromise)}
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
                            return dispatch(addComments(reviewId, response.id, {...comment}));
                        }
                        else return null
                    });
                    const criteriaPromise = item.criteria.map((criteria) => {
                        if (criteria) {
                            return dispatch(addCriteria(reviewId, response.id, {...criteria}));
                        }
                        else return null
                    });
                    return { ...response,
                        comments: await Promise.all(commentsPromise),
                        criteria: await Promise.all(criteriaPromise)}
                })
        })
        return Promise.all(goalsPromises).then((responses) => {
            responses.forEach((item) => {
                dispatch(actionCreators.goalAdd(reviewId, item));
            })
        })
    }
}

export const deleteGoal = (reviewId, goalId) => async dispatch => {
    try {
        const response = await axios.delete(`/api/v1/reviews/${reviewId}/goals/${goalId}/delete/`);
        dispatch(actionCreators.GoalRemove(reviewId, goalId))
        return response.data;
    } catch (error) {
        console.error(error);
    }
};