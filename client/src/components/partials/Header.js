import React from "react";
import { NavLink } from "react-router-dom";
import animal from "../../images/animal.svg";
import { auth } from "../../utils/auth";

const Header = () => {
    const logout = () => {
        auth.signout();
    };
    return (
        <header className="header">
            <NavLink className="header__logo link link--logo" to="/">
                <img src={animal} alt="logo" />
                <h1>Hypertube</h1>
            </NavLink>
            <div className="header__nav">
                <NavLink className="link link--nav" to="/settings">
                    Settings
                </NavLink>
                <NavLink className="link link--nav" to="/" onClick={logout}>
                    Logout
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
