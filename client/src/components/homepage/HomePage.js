import React, { Component } from 'react';
import queryString from 'query-string';

function EmailVerified(props) {
    return (
        <div className="popup-notif">
            {props.error ? <p>Something went wrong, please retry</p> : <p>Your email has been verified, you can now log in</p>}
        </div>
    );
}

function EmailToVerify() {
    return (
        <div className="popup-notif">
            <p>You must verifiy your email address to validate your account</p>
        </div>
    );
}

class HomePage extends Component {
    state = {
        username:'',
        lastName:'',
        firstName:'',
        email:'',
        password:'',
        signInUsername: '',
        signInPassword: '',
        emailVerified: false,
        emailToVerify: false,
        errors: {}
    }

    async componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        if (parsed.action && parsed.action === 'verifyemail' && parsed.email && parsed.token) {
            let res = await fetch("http://localhost:8145/email/emailcheckverification", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    email: parsed.email,
                    token: parsed.token
                })
            });
            this.setState({emailVerified: true});
            res = await res.json();            
            this.setState({
                error: res.error
            })
        }
    }

    handleInputChange = (inputName, e) => {
        this.setState({ [inputName]: e.target.value });
    }

    handleChange = e => {
        let reader = new FileReader();
        // let file = e.target.files[0];
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener(
            "load",
            e => {
                document.querySelector("#profile-picture").src = reader.result;
                // this.setState({ 
                //     picture: reader.result,
                //     // picture: file
                // });
            },
            false
        );
    };

    handleSignUp = async e => {
        e.preventDefault();
        this.setState({
            errors: {},
            emailToVerify: false
        })
        let formData = new FormData();
        let file = document.querySelector("#file-input").files[0];
        if (!file){
            this.setState({errors: {picture: true}})
        } else {
            formData.append("userPicture", file);
            formData.append("username", this.state.username);
            formData.append("firstName", this.state.firstName);
            formData.append("lastName", this.state.lastName);
            formData.append("email", this.state.email);
            formData.append("password", this.state.password);
            let res = await fetch("http://localhost:8145/auth/signup", {
                method: "POST",
                body: formData
            });
            res = await res.json();
            if (!res.success) {
                this.setState({
                    errors: {...res.errors}
                })      
            } else {
                this.setState({
                    emailToVerify: true
                })      
            }
        }
    };

    handleSignIn = async (e) => {
        e.preventDefault();
        this.setState({
            errors: {},
            msg: ''
        })
        const formValues = {
            username: this.state.signInUsername,
            password: this.state.signInPassword
        };
        let res = await fetch("http://localhost:8145/auth/signin", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formValues)
        });
        res = await res.json();
        if (!res.success) {
            this.setState({
                errors: {login: true},
                msg: res.msg
            })
        } else {
            localStorage.setItem('jwt', res.token);
        }
    };

    render() {
        return (
            <main className="homepage">
                {this.state.emailVerified ? <EmailVerified error={this.state.error} /> : null}
                {this.state.emailToVerify ? <EmailToVerify /> : null}
                <div className="homepage__description">
                    <ul className="homepage__description--list">
                        <li>
                            <i className="fas fa-film" />
                            <span>
                                Popular movies totally free with no adds !
                            </span>
                        </li>
                        <li>
                            <i className="fas fa-user-secret" />
                            <span>Torrent based, please use a VPN</span>
                        </li>
                        <li>
                            <i className="fas fa-globe-europe" />
                            <span>Best quality with subtitles</span>
                        </li>
                    </ul>
                </div>
                <div className="login-wrapper">
                    <div className="homepage__sign-in">
                        <form className="homepage__sign-in__form">
                            <div className="homepage__sign-in__form-content">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        className="input-container__input input-type-1"
                                        placeholder="Username"
                                        id="signin-username"
                                        value={ this.state.signInUsername }
                                        onChange={ e => this.handleInputChange("signInUsername", e) }
                                    />
                                </div>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        className="input-container__input input-type-1"
                                        placeholder="Password"
                                        id="signin-password"
                                        value={ this.state.signInPassword }
                                        onChange={ e => this.handleInputChange("signInPassword", e) }
                                    />
                                </div>
                                <input
                                    onClick={ this.handleSignIn }
                                    className="btn btn--primary"
                                    type="submit"
                                    value="Sign In !"
                                />
                            </div>
                            { this.state.errors.login ? <div className="input-container__display-error">{ this.state.msg }</div> : null }
                        </form>
                    </div>
                    <div className="homepage__sign-up">
                        <form className="homepage__sign-up__form" id="p1">
                            <div className="img-upload">
                                <label
                                    htmlFor="file-input"
                                    className="img-label"
                                >
                                    <img
                                        name="userPicture"
                                        id="profile-picture"
                                        alt="profile"
                                        src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                                        />
                                </label>
                                <input
                                    accept="image/*"
                                    id="file-input"
                                    type="file"
                                    onChange={this.handleChange}
                                />
                            </div>
                            { this.state.errors.picture ? <div className="input-container__display-error">You must pick a profile picture</div> : null }
                            <div className="input-container">
                                <i className="fas fa-id-card input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="First Name"
                                    value={ this.state.firstName }
                                    onChange={ e => this.handleInputChange("firstName", e) }
                                />
                            </div>
                            { this.state.errors.firstName ? <div className="input-container__display-error">Wrong first name</div> : null }
                            <div className="input-container">
                                <i className="far fa-id-card input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Last Name"
                                    value={ this.state.lastName }
                                    onChange={ e => this.handleInputChange("lastName", e) }
                                />
                            </div>
                            { this.state.errors.lastName ? <div className="input-container__display-error">Wrong last name</div> : null }
                            <div className="input-container">
                                <i className="fas fa-at input-container__icon" />
                                <input
                                    type="email"
                                    className="input-container__input input-type-1"
                                    placeholder="Email"
                                    value={ this.state.email }
                                    onChange={ e => this.handleInputChange("email", e) }
                                />
                            </div>
                            { this.state.errors.email ? <div className="input-container__display-error">Wrong email</div> : null }
                            { this.state.errors.duplicateEmail ? <div className="input-container__display-error">Email is already used</div> : null }
                            <div className="input-container">
                                <i className="fas fa-user input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Username"
                                    id="signup-username"
                                    value={ this.state.username }
                                    onChange={ e => this.handleInputChange("username", e) }
                                />
                            </div>
                            { this.state.errors.username ? <div className="input-container__display-error">Wrong username</div> : null }
                            { this.state.errors.duplicateUsername ? <div className="input-container__display-error">Username is already used</div> : null }
                            <div className="input-container">
                                <i className="fas fa-unlock input-container__icon" />
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Password"
                                    id="signup-password"
                                    value={ this.state.password }
                                    onChange={ e => this.handleInputChange("password", e) }

                                />
                            </div>
                            { this.state.errors.password ? <div className="input-container__display-error">Wrong password</div> : null }
                            <input
                                onClick={this.handleSignUp}
                                className="btn btn--primary"
                                type="submit"
                                value="Sign Up !"
                            />
                        </form>
                        <div className="signup-OAuth">
                            <a className="google btn btn--primary" href="http://localhost:8145/auth/google"> </a>
                            <a className="logo42 btn btn--primary" href="http://localhost:8145/auth/42"> </a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default HomePage;