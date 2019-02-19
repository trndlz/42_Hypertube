import React, { Component } from "react";
import './settings.css'

class Settings extends Component {
    handleChange = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener(
            "load",
            e => {
                document.querySelector("#profile-picture-settings").src = reader.result;
            },
            false
        );
    };
    render() {
        return (
            <div className="settings-form">
                <h1 className="text-center">Settings</h1>
                <form className="tab-pane active" id="p1-settings">
                    <div className="form-row">
                        <div className="form-group col-4 my-0">
                            <div className="input-group">
                                <div className="image-upload">
                                    <label
                                        htmlFor="file-input-settings"
                                        className="my-0"
                                    >
                                        <img
                                            id="profile-picture-settings"
                                            alt="profil"
                                            style={{
                                                border: "1px solid #ced4da",
                                                width: "93px",
                                                height: "93px",
                                                cursor: "pointer"
                                            }}
                                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                                        />
                                    </label>
                                    <input
                                        id="file-input-settings"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-8">
                            <div className="input-group mb-2 pt-1 input-next-picture">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fas fa-id-card" />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="input-group mb-0 input-next-picture">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="far fa-id-card" />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-at" />
                            </div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-user" />
                            </div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                        />
                    </div>
                    <div className="input-group mb-2">
                    <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-globe-americas"></i>
                            </div>
                        </div>
                        <select className="select-date form-control" defaultValue="2000">
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Italian">Italian</option>

                    </select>
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-unlock" />
                            </div>
                        </div>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-lock" />
                            </div>
                        </div>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="btn-validate"
                            type="submit"
                            value="Change Settings !"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Settings;
