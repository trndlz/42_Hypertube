import React, { Component } from 'react'

class Profile extends Component {
  render() {
    console.log("IN PROFILE");
    return (
      <div>
        <h2>PROFILE</h2>
        <p>The easiest thing to do is post on
        our <a href="http://forum.kirupa.com">forums</a>.
        </p>
      </div>
    )
  }
}

export default Profile;