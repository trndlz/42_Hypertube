import React, { Component } from "react";

class HomePage extends Component {
    handleChange = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener(
            "load",
            e => {
                document.querySelector("#profile-picture").src = reader.result;
            },
            false
        );
    };
    
    render() {
        return (
            <main className="homepage">
                <div className="homepage__description">
                    <ul className="homepage__description--list">
                        <li>
                            <i class="fas fa-film" />
                            <span>
                                Popular movies totally free with no adds !
                            </span>
                        </li>
                        <li>
                            <i class="fas fa-user-secret" />
                            <span>Torrent based, please use a VPN</span>
                        </li>
                        <li>
                            <i class="fas fa-globe-europe" />
                            <span>Best quality with subtitles</span>
                        </li>
                    </ul>
                </div>
                <div className="login-wrapper">
                <div className="homepage__sign-in">
                    <form className="homepage__sign-in__form">
                        <div className="input-container">
                            {/* <i className="fas fa-user input-container__icon" /> */}
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Username"
                            />
                        </div>
                        <div className="input-container">
                            {/* <i className="fas fa-unlock input-container__icon" /> */}
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Password"
                            />
                        </div>
                        <input
                            className="btn btn--primary"
                            type="submit"
                            value="Sign In !"
                        />
                    </form>
                </div>
                <div className="homepage__sign-up">
                    <form className="homepage__sign-up__form" id="p1">
                        <div className="img-upload">
                            <label htmlFor="file-input" className="img-label">
                                <img
                                    id="profile-picture"
                                    alt="profile"
                                    src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                                />
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                onChange={ this.handleChange }
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
                            value="Sign Up !"
                        />
                    </form>
                </div>
                </div>
                {/* </div> */}
            </main>
        );
    }
}

export default HomePage;
