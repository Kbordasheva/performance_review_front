import {types} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
    error: null,
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user')) || null,
    isAuthenticated: true,
    expirationDate: localStorage.getItem('expirationDate') || sessionStorage.getItem("expirationDate") || null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_START:
            return {
                ...state,
                isAuthenticated: false,
                error: null,
                loading: true
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated,
                expirationDate: action.payload.expirationDate,
                error: null,
                loading: false
            };
        case types.LOGIN_ERROR:
            return {
                ...state,
                error: action.payload.error,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated,
                expirationDate: action.payload.expirationDate,
                loading: false
            };
        case types.LOG_OUT:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated,
                expirationDate: action.payload.expirationDate,
            };
        default:
            return {
                ...state,
            };
    }
};

export default authReducer;
