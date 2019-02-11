import React, { Component, Fragment } from 'react'
import { Route } from "react-router-dom";
import Gallery from "./content/Gallery";
import Header from "../partials/Header";
import Profile from "./content/Profile";
import Settings from "./content/Settings";
import Video from "./content/Video";
import Sidebar from "./content/Sidebar";

class MainPage extends Component {
  render() {
    console.log("IN MAINPAGE");
    return (
      <Fragment>
        <Header/>
        <Sidebar />
        {/* <div style={{marginLeft: "300px"}}> */}
          <Route path="/mainpage/gallery" component={Gallery}/>
          <Route path="/mainpage/profile" component={Profile}/>
          <Route path="/mainpage/settings" component={Settings}/>
          <Route path="/mainpage/video" component={Video}/>
        {/* </div> */}
      </Fragment>        
    )
  }
}

export default MainPage;
