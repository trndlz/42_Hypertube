import React, { Component } from 'react'
import './profile.css'

class Profile extends Component {
  render() {
    console.log("IN PROFILE");
    return (
      <div className="container profile">
        <h1 className="text-center">Profile</h1>
        <div className="profileContent">
          <img className="userImg" src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt=""/>
          <div className="info-div">
            <span className="username">USERNAME</span>
            <span className="last-name">NOM</span>
            <span className="first-name">PRENOM</span>
            <span className="language">langue</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;