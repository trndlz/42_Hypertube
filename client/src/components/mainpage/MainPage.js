import React, { Component, Fragment } from 'react'
import { Route } from "react-router-dom";
import Gallery from "./content/Gallery";
import Profile from "./content/Profile";
import Settings from "./content/Settings";
import Video from "./content/Video";
import Header from "../partials/Header";
import SearchBar from "./content/SearchBar";

class MainPage extends Component {
  render() {
    return (
      <Fragment>
          <Header/>
          <main className="mainpage">
            <label className="label-check" htmlFor="checkbox">Search Options <i className="fas fa-arrow-circle-down"></i></label>
            <input type="checkbox" name="test" id="checkbox" />
            <SearchBar/>
            <Route path="/mainpage/gallery" component={Gallery}/>
            <Route path="/mainpage/profile" component={Profile}/>
            <Route path="/mainpage/settings" component={Settings}/>
            <Route path="/mainpage/video" component={Video}/>
          </main>
      </Fragment>
    )
  }
}

export default MainPage;
