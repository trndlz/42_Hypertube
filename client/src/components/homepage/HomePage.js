import React, { Component, Fragment } from "react";
import "./homepage.css";
import animal from '../../images/animal.svg'

class HomePage extends Component {
    handleChange = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener(
            "load",
            e => {
                document.querySelector("#profile-picture").src = reader.result;
            },
            false
        );
    }

    componentDidMount() {
        document.querySelector("footer").style.width = "100%";
    }
    render() {
        return (
            <Fragment>
            <div id="logoheader">
                <div>
                    <img src={animal} alt="logo"/>
                    <h1>Hypertube</h1>
                </div>
                
            </div>
                <div id="myContainer">
            <main>
				<div id="description" className="">
					<h1>Welcome to Hypertube !</h1>
					<p>See torrent video for free whith no adds ! </p>
					<p>
						Simply put all your private informations, a picture of you and all your credit cards !
					</p>
				</div>
                <div id="sign">
                    <nav className="nav nav-tabs">
                        <a
                            className="nav-item nav-link active w-50 btn-tabs"
                            href="#p1"
                            data-toggle="tab"
                        >
                            Sign Up
                        </a>
                        <a
                            className="nav-item nav-link w-50 btn-tabs"
                            href="#p2"
                            data-toggle="tab"
                        >
                            Sign In
                        </a>
                    </nav>
                    <div className="tab-content py-2 px-2">
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

                        <form className="tab-pane" id="p2">
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
                            <div id="sign-in-btn-wrapper" className="input-group">
                                <input
                                    id="sign-in-btn"
                                    className="btn-validate"
                                    type="submit"
                                    value="Sign In !"
                                />
                            </div>
                        </form>
                    </div>
                </div>

            </main>
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
