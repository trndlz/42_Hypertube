import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import animal from '../../images/animal.svg'

class Header extends Component {
  render() {
    return (
      <header className="header">
        {/* <div className="header__logo"> */}
        <NavLink className="header__logo link link--logo" to="/mainpage/gallery">
            <img src={animal} alt="logo"/>
            <h1>Hypertube</h1>
        </NavLink>
        {/* </div> */}
        <div className="header__nav">
          <NavLink className="link link--nav" to="/mainpage/settings">Settings</NavLink>
          <NavLink className="link link--nav" to="/logout">Logout</NavLink>
        </div>
     </header>
    )
  }
}

export default Header;
