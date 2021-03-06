import React, { useEffect, useState, useContext, useRef } from "react";
import jwt from 'jsonwebtoken';
import { SearchContext } from '../MainPage'
import Footer from "../../partials/Footer";
import useAsyncState from "../../../utils/useAsyncState";
import {
    validateEmail,
    validateUsername,
    validateFirstName,
    validateLastName,
    validatePassword,
} from "../../../validation/validation";
import internationalization from "../../../utils/internationalization";

const Settings = () => {
    let isMounted = useRef(false);
    const [username, setUsername] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [languageProfile, setLanguageProfile] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useAsyncState({});
    const [pictureChanged, setPictureChanged] = useState(false);
	const [isLoading, setIsLoading] = useState(1);
    const { language, setLanguage } = useContext(SearchContext);
    const languageSwitcher = internationalization(language);

    const handleChange = e => {
        let reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener(
                "load",
                e => {
                    document.querySelector("#profile-picture-settings").src =
                        reader.result;
                    setPictureChanged(true);
                },
                false
            );
        } else {
            document.querySelector("#profile-picture-settings").src =
                "https://bikeandbrain.files.wordpress.com/2015/05/face.jpg";
        }
    };

    useEffect(() => {
        let controller;
        isMounted.current = true;
        (async () => {
            const token = localStorage.getItem("jwt");
            setIsLoading(1);
            controller = new AbortController();
            const signal = controller.signal;
            try {
                let res = await fetch("http://localhost:8145/settings", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    signal
                });
                res = await res.json();
                if (res.isAuthenticated !== false) {
                    if (isMounted.current){
                        setFirstName(res.firstName);
                        setLastName(res.lastName);
                        setUsername(res.username);
                        setEmail(res.email);
                        setLanguageProfile(res.language);
                        setIsLoading(0);
                        let pic = document.querySelector("#profile-picture-settings");
                        if (pic) {
                            pic.src = /^http:\/\/localhost.*/.exec(res.picture) ? res.picture + "/" + Date.now() : res.picture;
                        }
                    }
                } else {
                    window.location.reload();
                }
            } catch (err) {}
        })();
        return () => {
            isMounted.current = false;
            controller.abort();
        };
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const selectedLanguage = document.querySelector("#language-select");
		data.append("language", selectedLanguage.value);
		setLanguage(selectedLanguage.value);
        data.append("pictureChanged", pictureChanged);
        let invalid = {};
        await setErrors({});
        if (!validateUsername(data.get("username"))) invalid.username = true;
        if (!validateEmail(data.get("email"))) invalid.email = true;
        if (!validateFirstName(data.get("firstName"))) invalid.firstName = true;
        if (!validateLastName(data.get("lastName"))) invalid.lastName = true;
        if (jwt.decode(localStorage.getItem('jwt')).connectionType === 'local' &&
            !validatePassword(data.get("password")) &&
            data.get("password") !== ""
        )
            invalid.password = true;
        if (Object.keys(invalid).length === 0) {
            const token = localStorage.getItem("jwt");
            let res = await fetch("http://localhost:8145/settings", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token
                },
                body: data
            });
            if (isMounted.current){
                res = await res.json();
                setPictureChanged(false);
                if (res.success){
                    localStorage.setItem("language", selectedLanguage.value);
                    localStorage.setItem("jwt", res.token);
                } else {
                    setErrors({ ...res.errors });
                }
            }
        } else {
            if (isMounted.current){
                setErrors({ ...invalid });
            }
        }
    };

    return (
        <div className="main-content-wrapper">
            <div className="settings-form login-wrapper">
                {isLoading === 1 ? (
                    <div className="cs-loader" style={{ height: "382px" }}>
                        <div className="cs-loader-inner">
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                        </div>
                    </div>
                ) : (
                    <form
                        className="homepage__sign-up__form"
                        onSubmit={handleSubmit}
                    >
                        <div className="img-upload">
                            <label htmlFor="file-input" className="img-label">
                                <img
                                    id="profile-picture-settings"
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
                        {errors.picture ? (
                            <div className="input-container__display-error">
                                Image invalid
                            </div>
                        ) : null}
                        <div className="input-container">
                            <i className="fas fa-id-card input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="First Name"
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                name="firstName"
                            />
                        </div>
                        {errors.firstName ? (
                            <div className="input-container__display-error">
                                Wrong first name
                            </div>
                        ) : null}
                        <div className="input-container">
                            <i className="far fa-id-card input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Last Name"
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                name="lastName"
                            />
                        </div>
                        {errors.lastName ? (
                            <div className="input-container__display-error">
                                Wrong last name
                            </div>
                        ) : null}
                        <div className="input-container">
                            <i className="fas fa-at input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                                value={email ? email : ''}
                                name="email"
                            />
                        </div>
                        {errors.email ? (
                            <div className="input-container__display-error">
                                Wrong email
                            </div>
                        ) : null}
                        {errors.duplicateEmail ? (
                            <div className="input-container__display-error">
                                Email is already used
                            </div>
                        ) : null}
                        <div className="input-container">
                            <i className="fas fa-user input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Username"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                name="username"
                            />
                        </div>
                        {errors.username ? (
                            <div className="input-container__display-error">
                                Wrong username
                            </div>
                        ) : null}
                        {errors.duplicateUsername ? (
                            <div className="input-container__display-error">
                                Username is already used
                            </div>
                        ) : null}
                        <div className="input-container">
                            <i className="fas fa-globe-americas input-container__icon icon-select" />
                            <div className="select">
                                <select
                                    onChange={e => setLanguageProfile(e.target.value)}
                                    value={languageProfile}
                                    id="language-select"
                                >
                                    <option value="en">English</option>
                                    <option value="fr">French</option>
                                    <option value="ge">German</option>
                                    <option value="es">Spanish</option>
                                </select>
                            </div>
                        </div>
                        { jwt.decode(localStorage.getItem('jwt')).connectionType === 'local' ?
                        <div className="input-container">
                            <i className="fas fa-unlock input-container__icon" />
                            <input
                                type="password"
                                className="input-container__input input-type-1"
                                placeholder="●●●●●●●"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                name="password"
                            />
                        </div>
                        : null}
                        {errors.password ? (
                            <div className="input-container__display-error">
                                Wrong password
                            </div>
                        ) : null}
                        <input
                            className="btn btn--primary"
                            type="submit"
                            value={languageSwitcher.validate}
                        />
                    </form>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Settings;
