import React from "react";
import { NavLink } from "react-router-dom";
import animal from "../../images/animal.svg";

const Header = () => {
    return (
        <header className="header">
            <NavLink
                className="header__logo link link--logo"
                to="/mainpage/gallery"
            >
                <img src={animal} alt="logo" />
                <h1>Hypertube</h1>
            </NavLink>
            <div className="header__nav">
                <NavLink className="link link--nav" to="/mainpage/settings">
                    Settings
                </NavLink>
                <NavLink className="link link--nav" to="/logout">
                    Logout
                </NavLink>
            </div>
        </header>
    );
}

export default Header;