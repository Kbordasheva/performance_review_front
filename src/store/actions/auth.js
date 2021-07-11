import actionCreators from "./actionCreators";
import axios from "../../axios";

export const login = (credentials) => {
    return dispatch => {
        dispatch(actionCreators.loginStart());
        axios.post("/api/v1/login/", credentials)
            .then(response => {
                const expirationDate = new Date().setHours(new Date().getHours() + 11);

                if (credentials.remember) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.employee));
                    localStorage.setItem('expirationDate', expirationDate);
                } else {
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("user", JSON.stringify(response.data.employee));
                    sessionStorage.setItem('expirationDate', expirationDate);
                }
                dispatch(actionCreators.loginSuccess(response.data.token, response.data.employee, expirationDate));
            })
            .catch(error => {
                console.error(error);
                dispatch(actionCreators.loginError(error));
            });
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return (dispatch, getState) => {
        const {auth: {token, expirationDate}} = getState()
        if (!token) {

            dispatch(logout(false));
        } else {
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(checkAuthTimeout((expirationDate - new Date().getTime()) / 1000));
            }
        }
    };
};

export const logout = (tokenExists = true) => {
    return dispatch => {
        if (tokenExists) {
            axios.post("/api/v1/logout/", '')
                .then(response => {
                    dispatch(actionCreators.logout());
                })
                .catch(error => {
                    console.error(error);
                });
            localStorage.removeItem("token")
            || localStorage.removeItem("expirationDate")
            || localStorage.removeItem("user");
            localStorage.removeItem("relocationRequestFilterSettings");

            sessionStorage.removeItem("token")
            || sessionStorage.removeItem("expirationDate")
            || sessionStorage.removeItem("user");
        } else {
            dispatch(actionCreators.logout());
        }
    };
};
