import {types} from "./types";

const loginStart = () => {
    return {
        type: types.LOGIN_START
    };
};

const loginSuccess = (token, user, expirationDate) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            token: token,
            user: user,
            isAuthenticated: true,
            expirationDate: expirationDate,
        },
    };
};

const loginError = (error) => {
    return {
        type: types.LOGIN_ERROR,
        payload: {
            token: null,
            user: null,
            error: error,
            isAuthenticated: false,
            expirationDate: null
        },
    };
};

const logout = () => {
    return {
        type: types.LOG_OUT,
        payload: {
            token: null,
            user: null,
            isAuthenticated: false,
            expirationDate: null
        },
    };
};

const reviewListLoaded = (data) => {
    return {
        type: types.REVIEW_LIST_LOADED,
        payload: {
            next: data.next,
            reviewList: data.results,
            previous: data.previous,
        },
    };
};

const reviewListUpdated = (data) => {
    return {
        type: types.REVIEW_LIST_UPDATED,
        payload: {
            next: data.next,
            reviewList: data.results,
            previous: data.previous,
        },
    };
};

const employeeGoalsDoneCount = (employeeId, data) => {
    return {
        type: types.EMPLOYEE_GOALS_DONE_COUNT,
        payload: {
            data: data,
            employeeId: employeeId
        },
    };
};



const reviewListError = () => {
    return {
        type: types.REVIEW_LIST_ERROR,
        payload: {
            next: null,
            reviewList: null,
            previous: null,
        },
    };
};

const reviewListUpdate = (data) => {
    return {
        type: types.REVIEW_LIST_UPDATE,
        payload: {
            reviewList: data.reviewList,
            reviewId: data.reviewId,
        },
    };
};

const profileDetailsLoaded = (data) => {
    return {
        type: types.PROFILE_DETAILS_LOADED,
        payload: {
            profile: data,
        },
    };
};

const profileDetailsUpdated = (data) => {
    return {
        type: types.PROFILE_DETAILS_UPDATED,
        payload: {
            profile: data,
        },
    };
};

const profileDetailsError = () => {
    return {
        type: types.PROFILE_DETAILS_ERROR,
        payload: {
            profile: null,
        },
    };
};

const generalInfoUpdated = (data) => {
    return {
        type: types.GENERAL_INFO_UPDATED,
        payload: {
            generalInfo: data,
        },
    };
};

const skillsLoad = (data) => {
    return {
        type: types.SKILLS_LOAD,
        payload: {
            next: data.next,
            skills: data.results,
            previous: data.previous,
        },
    };
}

const goalUpdate = (reviewId, data) => {
    return {
        type: types.GOAL_UPDATE,
        payload: {
            reviewId: reviewId,
            goal: data,
        },
    };
};

const goalIsDone = (reviewId, goalId, data) => {
    return {
        type: types.GOAL_IS_DONE,
        payload: {
            data: data,
            reviewId: reviewId,
            goalId: goalId,
        },
    };
};

const goalAdd = (reviewId, data) => {
        return {
        type: types.GOAL_ADD,
        payload: {
            goal: data,
            reviewId: reviewId
        },
    };
}

const ReviewAdd = (data) => {
        return {
        type: types.REVIEW_ADD,
        payload: {
            review: data,
        },
    };
}

const GoalRemove = (reviewId, goalId) => {
    return {
        type: types.GOAL_REMOVE,
        payload: {
            goalId: goalId,
            reviewId: reviewId
        }
    };
}

const criteriaAdd = (data, reviewId, goalId) => {
        return {
        type: types.CRITERIA_ADD,
        payload: {
            criteria: data,
            reviewId: reviewId,
            goalId: goalId
        },
    };
}

const commentAdd = (data, reviewId, goalId) => {
        return {
        type: types.COMMENT_ADD,
        payload: {
            comment: data,
            reviewId: reviewId,
            goalId: goalId
        },
    };
}

const EmployeeAdd = (data) => {
        return {
        type: types.EMPLOYEE_ADD,
        payload: data
    };
}

const logger = {
    loginStart,
    loginSuccess,
    logout,
    loginError,
    reviewListLoaded,
    reviewListUpdated,
    reviewListError,
    reviewListUpdate,
    profileDetailsLoaded,
    profileDetailsUpdated,
    profileDetailsError,
    generalInfoUpdated,
    skillsLoad,
    goalUpdate,
    goalAdd,
    ReviewAdd,
    GoalRemove,
    criteriaAdd,
    commentAdd,
    goalIsDone,
    employeeGoalsDoneCount,
    EmployeeAdd,
}

export default logger