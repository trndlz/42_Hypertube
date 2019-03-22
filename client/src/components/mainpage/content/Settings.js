import React, { useEffect, useState } from "react";
import Footer from "../../partials/Footer";
import { validateEmail, validateUsername, validateFirstName, validateLastName, validatePassword, validatePicture } from '../../../validation/validation';
import useAsyncState from '../../../utils/useAsyncState';

const Settings = () => {
    const [username, setUsername] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useAsyncState({});
    const [isLoading, setIsLoading] = useState(false);
    const languages = {
        "en": "English",
        "fr": "French",
        "ge": "German",
        "sp": "Spanish",
        "it": "Italian",
    }

    const handleChange = e => {
        let reader = new FileReader();
        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener(
                "load",
                e => {
                    document.querySelector("#profile-picture-settings").src = reader.result;
                },
                false
            );
        } else {
            document.querySelector("#profile-picture-settings").src = 'https://bikeandbrain.files.wordpress.com/2015/05/face.jpg';
        }
    };

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("jwt");
            let res = await fetch("http://localhost:8145/secure/settings", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            res = await res.json();
            // console.log(res);
            document.querySelector("#profile-picture-settings").src = res.picture;
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setUsername(res.username);
            setEmail(res.email);
            setLanguage(res.language);
        })()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        // console.log("data.get", data.get("userPicture"));
        // let invalid = {};
        // await setErrors({});
        // if (!validateUsername(data.get("username"))) invalid.username = true;
        // if (!validateEmail(data.get("email"))) invalid.email = true;
        // if (!validateFirstName(data.get("firstName"))) invalid.firstName = true;
        // if (!validateLastName(data.get("lastName"))) invalid.lastName = true;
        // if (!validatePassword(data.get("password"))) invalid.password = true;
        // if (!validatePicture(data.get("userPicture"))) invalid.picture = true;
        // console.log(invalid);
        // if (Object.keys(invalid).length === 0) {
            console.log("HERE");
            // setIsLoading(true);
            const token = localStorage.getItem("jwt");
            let res = await fetch("http://localhost:8145/secure/settings", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                },
                body: data
            });
            res = await res.json();
            if (!res.success) {
                setErrors({...res.errors});
            } else {
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPassword('');
            }
            // setIsLoading(false);
        // } else {
            // setErrors({...invalid});
        // }
    }

    return (
        <div className="main-content-wrapper">
            <div className="settings-form login-wrapper">
                <div className="homepage__sign-up">
                    <form className="homepage__sign-up__form" onSubmit={handleSubmit}>
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
                                accept="image/*"
                                id="file-input"
                                type="file"
                                onChange={handleChange}
                                name="userPicture"
                            />
                        </div>
                        <div className="input-container">
                            <i className="fas fa-id-card input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="First Name"
                                onChange={ e => setFirstName(e.target.value) }
                                value={firstName}
                                name="firstName"

                            />
                        </div>
                        <div className="input-container">
                            <i className="far fa-id-card input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Last Name"
                                onChange={ e => setLastName(e.target.value) }
                                value={lastName}
                                name="lastName"
                            />
                        </div>
                        <div className="input-container">
                            <i className="fas fa-at input-container__icon" />
                            <input
                                type="email"
                                className="input-container__input input-type-1"
                                placeholder="Email"
                                onChange={ e => setEmail(e.target.value) }
                                value={email}
                                name="email"
                            />
                        </div>
                        <div className="input-container">
                            <i className="fas fa-user input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Username"
                                onChange={ e => setUsername(e.target.value) }
                                value={username}
                                name="username"
                            />
                        </div>
                        <div className="input-container">
                            <i className="fas fa-globe-americas input-container__icon icon-select" />
                            <div className="select">
                                <select defaultValue={languages[language]}>
                                    <option value="en">English</option>
                                    <option value="fr">French</option>
                                    <option value="ge">German</option>
                                    <option value="sp">Spanish</option>
                                    <option value="it">Italian</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-container">
                            <i className="fas fa-unlock input-container__icon" />
                            <input
                                type="text"
                                className="input-container__input input-type-1"
                                placeholder="Password"
                                onChange={ e => setPassword(e.target.value) }
                                value={password}
                                name="password"
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

export default Settings;
