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

const logger = {
    loginStart,
    loginSuccess,
    logout,
    loginError,
    reviewListLoaded,
    reviewListUpdated,
    reviewListError,
    reviewListUpdate
}

export default logger