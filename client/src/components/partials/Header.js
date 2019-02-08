import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './header.css'
import animal from '../../images/animal.svg'

class Header extends Component {
  render() {
    return (
      <header>
        <div id="logoheader">
          <div>
            <img src={animal} alt="logo"/>
            <h1>Hypertube</h1>
          </div>
          
        </div>
        <div id="menuheader">
          <NavLink className="linksnav1" to="/mainpage/settings">Settings</NavLink>
          <NavLink className="linksnav2" to="/logout">Logout</NavLink>
        </div>
     </header>
    )
  }
}

export default Header;
