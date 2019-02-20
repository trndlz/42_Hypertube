import React, { Component } from "react";
import Footer from "../../partials/Footer";

class Settings extends Component {
    handleChange = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener(
            "load",
            e => {
                document.querySelector("#profile-picture-settings").src =
                    reader.result;
            },
            false
        );
    };
    render() {
        return (
            <div className="main-content-wrapper">
                <div className="settings-form login-wrapper">
                    <div className="homepage__sign-up">
                        <form className="homepage__sign-up__form" id="p1">
                            <div className="img-upload">
                                <label
                                    htmlFor="file-input"
                                    className="img-label"
                                >
                                    <img
                                        id="profile-picture-settings"
                                        alt="profile"
                                        src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                                    />
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-container">
                                <i className="fas fa-id-card input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="input-container">
                                <i className="far fa-id-card input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="input-container">
                                <i className="fas fa-at input-container__icon" />
                                <input
                                    type="email"
                                    className="input-container__input input-type-1"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="input-container">
                                <i className="fas fa-user input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="input-container">
                                <i className="fas fa-globe-americas input-container__icon icon-select" />
                                <div className="select">
                                    <select defaultValue="English">
                                        <option value="English">English</option>
                                        <option value="French">French</option>
                                        <option value="German">German</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="Italian">Italian</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-container">
                                <i className="fas fa-unlock input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="input-container">
                                <i className="fas fa-lock input-container__icon " />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <input
                                className="btn btn--primary"
                                type="submit"
                                value="Validate"
                            />
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Settings;
