import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from '../../assets/img/logo.svg'

import "./Header.scss";
import { logout } from "../../store/actions/auth";

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <header className="header">
            <div className="header-inner">
                <div className="left-menu">
                    <Link to="/">
                        <img src={logo} alt={"logo"} width="70" />
                    </Link>
                    <span className="logo-name">Performance review</span>
                </div>
                {isAuthenticated && (
                  <div className="right-menu">
                    <Link to={"/login"} onClick={onClick}>
                      Log out
                    </Link>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Header;
