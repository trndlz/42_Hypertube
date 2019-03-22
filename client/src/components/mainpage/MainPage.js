import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import Gallery from "./content/Gallery";
import Profile from "./content/Profile";
import Settings from "./content/Settings";
import Video from "./content/Video";
import Header from "../partials/Header";
import SearchBar from "./content/SearchBar";

const MainPage = props => {
    const renderRedirect = () => {
        if (
            !/^\/profile(\/.*)?$/.test(props.location.pathname) &&
            !/^\/video(\/.*)?$/.test(props.location.pathname) &&
            !/^\/settings\/?$/.test(props.location.pathname) &&
            props.location.pathname !== "/"
        ) {
            return <Redirect to="/" />;
        }
    };
    return (
        <Fragment>
            {renderRedirect()}
            <Header />
            <main className="mainpage">
                <input type="checkbox" name="test" id="checkbox" />
                <label className="label-check" htmlFor="checkbox">
                    Search Options <i className="fas fa-arrow-circle-down" />
                </label>
                <SearchBar />
                <Route exact path="/" component={Gallery} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/video" component={Video} />
            </main>
        </Fragment>
    );
};

export default MainPage;
