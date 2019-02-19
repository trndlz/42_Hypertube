import React, { Component, Fragment } from 'react'
import { Route } from "react-router-dom";
import Gallery from "./content/Gallery";
import Profile from "./content/Profile";
import Settings from "./content/Settings";
import Video from "./content/Video";
import Footer from "../partials/Footer";
import Header from "../partials/Header";

class MainPage extends Component {
  render() {
    console.log("IN MAINPAGE");
    return (
      <Fragment>
        <Header/>
          <Route path="/mainpage/gallery" component={Gallery}/>
          <Route path="/mainpage/profile" component={Profile}/>
          <Route path="/mainpage/settings" component={Settings}/>
          <Route path="/mainpage/video" component={Video}/>
        <Footer/>
      </Fragment>        
    )
  }
}

export default MainPage;
