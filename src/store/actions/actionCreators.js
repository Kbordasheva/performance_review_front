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

const logger = {
    loginStart,
    loginSuccess,
    logout,
    loginError,
}

export default logger