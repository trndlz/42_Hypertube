import React, { Fragment, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Gallery from "./content/Gallery";
import Profile from "./content/Profile";
import Settings from "./content/Settings";
import Video from "./content/Video";
import Header from "../partials/Header";

export const SearchContext = React.createContext();

const MainPage = props => {
    let [search, setSearch] = useState({});

    const renderRedirect = () => {
        if (
            !localStorage.getItem("jwt") || (
            !/^\/profile\/(.+)$/.test(props.location.pathname) &&
            !/^\/video(\/.*)?$/.test(props.location.pathname) &&
            !/^\/settings\/?$/.test(props.location.pathname) &&
            props.location.pathname !== "/")
        ) {
            return true;
        } else {return false}
    };
    
    return (
        <Fragment>
            {renderRedirect() ? 
            <Redirect to="/" /> :
            <Fragment>
            <Header />
            <main className="mainpage">
                <input type="checkbox" name="test" id="checkbox" />
                <label className="label-check" htmlFor="checkbox">
                    Search Options <i className="fas fa-arrow-circle-down" />
                </label>
                <SearchContext.Provider value={{ search, setSearch }}>
                    <Route exact path="/" component={Gallery}/>
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/video/:imdb" component={Video} />
                </SearchContext.Provider>
            </main>
            </Fragment>
            }
        </Fragment>
    );
};

export default MainPage;