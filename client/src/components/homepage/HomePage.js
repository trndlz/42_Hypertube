import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { validateEmail, validateUsername, validateFirstName, validateLastName, validatePassword, validatePicture } from '../../validation/validation'
import useAsyncState from '../../utils/useAsyncState';

function EmailVerified(props) {
    return (
        <div className="popup-notif">
            {props.emailError ? <p>Something went wrong, please retry</p> : <p>Your email has been verified, you can now log in</p>}
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

const HomePage = (props) => {
    const [username, setUsername] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [msg, setMsg] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errors, setErrors] = useAsyncState({});
    const [isLoading, setIsLoading] = useState(false);

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/mainpage/gallery'/>
        }
    }

    const handleChange = e => {
        let reader = new FileReader();
        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener(
                "load",
                e => {
                    document.querySelector("#profile-picture").src = reader.result;
                },
                false
            );
        } else {
            document.querySelector("#profile-picture").src = 'https://bikeandbrain.files.wordpress.com/2015/05/face.jpg';
        }
    };

    const handleSignUp = async e => {
        e.preventDefault();
        const data = new FormData(e.target)
        let invalid = {};
        await setErrors({});
        setEmailToVerify(false);
        if (!validateUsername(data.get("username"))) invalid.username = true;
        if (!validateEmail(data.get("email"))) invalid.email = true;
        if (!validateFirstName(data.get("firstName"))) invalid.firstName = true;
        if (!validateLastName(data.get("lastName"))) invalid.lastName = true;
        if (!validatePassword(data.get("password"))) invalid.password = true;
        if (!validatePicture(data.get("userPicture"))) invalid.picture = true;
        if (Object.keys(invalid).length === 0) {
            setIsLoading(true);
            let res = await fetch("http://localhost:8145/auth/signup", {
                method: "POST",
                body: data
            });
            res = await res.json();
            if (!res.success) {
                setErrors({...res.errors});
            } else {
                setEmailToVerify(true);
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPassword('');
            }
            setIsLoading(false);
        } else {
            setErrors({...invalid});
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setErrors({});
        setMsg('');
        const data = new FormData(e.target);
        let res = await fetch("http://localhost:8145/auth/signin", {
            method: "POST",
            body: data
        });
        res = await res.json();
        if (!res.success) {
            setErrors({...errors, login: true})
            setMsg(res.msg)
        } else {
            setRedirect(true);
            localStorage.setItem('jwt', res.token);
            console.log(res.token)
        }
    };

    // Email Redirection
    useEffect(() => {
        (async () => {
            const parsed = queryString.parse(props.location.search);
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
                res = await res.json();
                setEmailVerified(true);
                setEmailError(res.error)
            }
        })()
    }, [])

    return (
        <main className="homepage">
        {renderRedirect()}
            {emailVerified ? <EmailVerified emailError={emailError} /> : null}
            {emailToVerify ? <EmailToVerify /> : null}
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
                    <form className="homepage__sign-in__form" id="signinform" onSubmit={handleSignIn}>
                        <div className="homepage__sign-in__form-content">
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Username"
                                    id="signin-username"
                                    value={ signInUsername }
                                    name="username"
                                    onChange={ e => setSignInUsername(e.target.value) }
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="input-container__input input-type-1"
                                    placeholder="Password"
                                    id="signin-password"
                                    value={ signInPassword }
                                    name="password"
                                    onChange={ e => setSignInPassword(e.target.value) }
                                />
                            </div>
                            <input
                                className="btn btn--primary"
                                type="submit"
                                value="Sign In !"
                            />
                        </div>
                        { errors.login ? <div className="input-container__display-error">{ msg }</div> : null }
                    </form>
                </div>
                <div className="homepage__sign-up">
                {isLoading ? (
                        <div className="cs-loader">
                            <div className="cs-loader-inner">
                            <label>	●</label>
                            <label>	●</label>
                            <label>	●</label>
                            <label>	●</label>
                            <label>	●</label>
                            <label>	●</label>
                            </div>
                        </div>
                    ) : (
                    <form className="homepage__sign-up__form" id="signupform" onSubmit={handleSignUp}>
                        <div className="img-upload">
                            <label
                                htmlFor="file-input"
                                className="img-label"
                            >
                                <img
                                    id="profile-picture"
                                    alt="profile"
                                    src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                                    />
                            </label>
                            <input
                                accept="image/*"
                                id="file-input"
                                type="file"
                                onChange={handleChange}
                                name="userPicture"
                            />
                        </div>
                        { errors.picture ? <div className="input-container__display-error">You must pick a profile picture</div> : null }
                        <div className="input-container">
                            <i className="fas fa-id-card input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="First Name"
                                value={ firstName }
                                name="firstName"
                                onChange={ e => setFirstName(e.target.value) }
                            />
                        </div>
                        { errors.firstName ? <div className="input-container__display-error">Wrong first name</div> : null }
                        <div className="input-container">
                            <i className="far fa-id-card input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Last Name"
                                value={ lastName }
                                name="lastName"
                                onChange={ e => setLastName(e.target.value) }
                            />
                        </div>
                        { errors.lastName ? <div className="input-container__display-error">Wrong last name</div> : null }
                        <div className="input-container">
                            <i className="fas fa-at input-container__icon" />
                            <input
                                type="email"
                                className="input-container__input input-type-1"
                                placeholder="Email"
                                value={ email }
                                name="email"
                                onChange={ e => setEmail(e.target.value) }
                            />
                        </div>
                        { errors.email ? <div className="input-container__display-error">Wrong email</div> : null }
                        { errors.duplicateEmail ? <div className="input-container__display-error">Email is already used</div> : null }
                        <div className="input-container">
                            <i className="fas fa-user input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Username"
                                id="signup-username"
                                value={ username }
                                name="username"
                                onChange={ e => setUsername(e.target.value) }
                            />
                        </div>
                        { errors.username ? <div className="input-container__display-error">Wrong username</div> : null }
                        { errors.duplicateUsername ? <div className="input-container__display-error">Username is already used</div> : null }
                        <div className="input-container">
                            <i className="fas fa-unlock input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Password"
                                id="signup-password"
                                value={ password }
                                name="password"
                                onChange={ e => setPassword(e.target.value) }
                            />
                        </div>
                        { errors.password ? <div className="input-container__display-error">Wrong password</div> : null }
                        <input
                            className="btn btn--primary"
                            type="submit"
                            value="Sign Up !"
                        />
                    </form>)}
                    <div className="signup-OAuth">
                        <a className="google btn btn--primary" href="http://localhost:8145/auth/google"> </a>
                        <a className="logo42 btn btn--primary" href="http://localhost:8145/auth/the42"> </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;