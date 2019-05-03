import React from "react";
import { NavLink } from "react-router-dom";
import animal from "../../images/animal.svg";
import { auth } from "../../utils/auth";
import internationalization from "../../utils/internationalization";

const Header = (language) => {
    const logout = () => {
        auth.signout();
    };
    const languageSwitcher = internationalization(language.language);
    return (
        <header className="header">
            <NavLink className="header__logo link link--logo" to="/">
                <img src={animal} alt="logo" />
                <h1>Hypertube</h1>
            </NavLink>
            <div className="header__nav">
                <NavLink className="link link--nav" to="/settings">
                    {languageSwitcher.settings}
                </NavLink>
                <NavLink className="link link--nav" to="/" onClick={logout}>
                {languageSwitcher.logout}
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
