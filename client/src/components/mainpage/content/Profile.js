import React, { Component } from "react";
import Footer from "../../partials/Footer";

class Profile extends Component {
    render() {
        return (
            <div className="main-content-wrapper">
                <div className="profile">
                    <img
                        className="user-img user-img--fat"
                        src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                        alt=""
                    />
                    <span className="username">Bligandeur</span>
                    <div>
                        <span className="last-name">marc</span>
                        <span className="first-name">Leonetti</span>
                    </div>
                    <span className="language">francais</span>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Profile;
