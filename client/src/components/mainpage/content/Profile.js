import React, { Fragment, useEffect, useState } from "react";
import Footer from "../../partials/Footer";

const Profile = props => {
    const [username, setUsername] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [language, setLanguage] = useState("");
    const [isLoading, setIsLoading] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const languages = {
        ge: "German",
        en: "English",
        it: "Italian",
        sp: "Spanish",
        fr: "French"
    };

    useEffect(() => {
        let controller;
        (async () => {
            const id = props.location.pathname.split("/")[2];
            const token = localStorage.getItem("jwt");
            controller = new AbortController();
            const signal = controller.signal;
            setIsLoading(1);
            try {
                let res = await fetch(`http://localhost:8145/profile/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    signal
                });
                res = await res.json();
                let comments = await fetch(`http://localhost:8145/comments/user/${id}`,{
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    // signal
                });
                await comments.json();
                if (res.success) {
                    setIsSuccess(true);
                    setFirstName(res.firstName);
                    setLastName(res.lastName);
                    setUsername(res.username);
                    setLanguage(res.language);
                    setIsLoading(0);
                    let pic = document.querySelector(
                        "#profile-picture-profile"
                    );
                    if (pic) pic.src = res.picture + "/" + new Date().getTime();
                } else {
                    setIsLoading(0);
                }
            } catch (err) {}
        })();
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="main-content-wrapper">
            <div className="profile">
                {isLoading === 1 ? (
                    <div className="cs-loader" style={{ height: "249px" }}>
                        <div className="cs-loader-inner">
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                            <label>●</label>
                        </div>
                    </div>
                ) : !isSuccess ? (
                    <div>USER NOT FOUND</div>
                ) : (
                    <Fragment>
                        <img
                            className="user-img user-img--fat"
                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                            alt=""
                            id="profile-picture-profile"
                        />
                        <span className="username">{username}</span>
                        <div>
                            <span className="last-name">{firstName}</span>
                            <span className="first-name">{lastName}</span>
                        </div>
                        <span className="language">{languages[language]}</span>
                    </Fragment>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
