import React, { Component } from 'react'

class Settings extends Component {
  render() {
    return (
      <div>
         <form className="tab-pane active" id="p1">
                            <div className="form-row">
                                <div className="form-group col-4 my-0">
                                    <div className="input-group">
                                        <div className="image-upload">
                                            <label
                                                htmlFor="file-input"
                                                className="my-0"
                                            >
                                                <img
                                                    id="profile-picture"
                                                    alt="profil"
                                                    style={{
                                                        border:
                                                            "1px solid #ced4da",
                                                        width: "93px",
                                                        height: "93px",
                                                        cursor: "pointer"
                                                    }}
                                                    src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                                                />
                                            </label>
                                            <input
                                                id="file-input"
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-8">
                                    <div className="input-group mb-2 pt-1">
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
                                    <div className="input-group mb-0">
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
                                    value="Sign Up !"
                                />
                            </div>
                        </form>
      </div>
    )
  }
}

export default Settings;