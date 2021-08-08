import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {login} from "../../store/actions/auth";
import "./Auth.scss";

const Auth = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
        remember: false,
    });

    const onChange = (e) => {
        e.target.name === "remember"
            ? setUserInput({...userInput, remember: e.target.checked})
            : setUserInput({...userInput, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userInput));
    };


    if (isAuthenticated) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h3>Sign in</h3>
                <label>Username</label>
                <input
                    type="text"
                    className="sc-AxirZ kMUuzK sc-pYNsO iaFdeJ"
                    value={userInput.username}
                    name="username"
                    onChange={onChange}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="sc-AxirZ kMUuzK sc-pYNsO iaFdeJ"
                    value={userInput.password}
                    name="password"
                    onChange={onChange}
                />
                <label>
                    <input type="checkbox" name="remember" onChange={onChange}/>
                    Remember me
                </label>
                <button className="button blue btn-login main-btn" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Auth;
