import React, { useEffect, useState, Fragment } from "react";
import Footer from "../../partials/Footer";

const Video = (props) => {
    const [data, setData] = useState({});
    const [stars, setStars] = useState([]);
    const [isLoading, setIsLoading] = useState(1);

    useEffect(() => {
        let controller;
        (async () => {
            const token = localStorage.getItem("jwt");
            const imdb = props.location.pathname.split("/")[2];
            controller = new AbortController();
            const signal = controller.signal;
            try {
                let res = await fetch(`http://localhost:8145/video/${imdb}`,{
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    signal
                });
                res = await res.json();
                setData(res.data);
                setIsLoading(0);
            } catch (err) {}
        })();
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        let starsArray = [];
        for (let i=0; i < 5; i++) {
            if (i <= Math.trunc(data.rating / 2)) {
                starsArray.push(<i className="fas fa-star yellow-star" key={i} />);
            } else {
                starsArray.push(<i className="fas fa-star" key={i} />);
            }
        }
        setStars(starsArray); 
    }, [data]);

    const minToHour = min => {
        let hour = Math.trunc(min / 60);
        min = min % 60;
        return hour && min ? `${hour}h ${min}min` : 'N/A';
    }
    
    return (
        <div className="main-content-wrapper">
            {isLoading ?
            <div className="cs-loader" style={{height: "100vh"}}>
                <div className="cs-loader-inner">
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                </div>
            </div>
            :
            <Fragment>
            <div className="video-description">
                <img className="video-img" src={data.large_cover_image} alt="" />
                <div className="video-info">
                    <h2 className="video-title">
                        {data.title} <span className="video-date">({data.year})</span>
                    </h2>
                    <div className="video-rating">
                        {[...stars]}
                    </div>
                    <div className="video-time">{minToHour(data.runtime)}</div>
                    <span className="separator" />
                    <div className="video-desc">
                        {data.summary}
                    </div>
                    <div className="video-actors">
                        Director:{" "}{data.omdb ? data.omdb.Director : null}
                        <br/>
                        Actors:{" "}{data.omdb ? data.omdb.Actors : null}
                    </div>
                </div>
            </div>
            <div className="video-wrapper">
                <div className="video-player">
                    <iframe
                        title="video"
                        className="my-video"
                        src="https://player.twitch.tv/?channel=degun"
                        controls
                    />
                </div>
            </div>
            <div className="comment-wrapper">
                <div className="your-comment">
                    <img
                        className="user-img"
                        src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                        alt="user"
                    />
                    <textarea
                        className="comment-area"
                        name=""
                        id=""
                        cols=""
                        rows="1"
                    />
                    <button className="send-comment-btn">Send</button>
                </div>
                <div className="video-comments">
                    <div className="comment">
                        <img
                            className="user-img"
                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                            alt="user"
                        />
                        <div className="comment-text">
                            <span className="username">Sven</span>
                            <span className="commentText">
                                mon commentaire Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Corrupti ea,
                                esse exercitationem cumque asperiores, quo
                                unde id illum at deleniti repellat quis.
                                Illum, velit illo eaque voluptatum beatae
                                iusto officia.
                            </span>
                        </div>
                    </div>
                    <div className="comment">
                        <img
                            className="user-img"
                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                            alt="user"
                        />
                        <div className="comment-text">
                            <span className="username">Sven</span>
                            <span className="commentText">
                                mon commentaire Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Corrupti ea,
                                esse exercitationem cumque asperiores, quo
                                unde id illum at deleniti repellat quis.
                                Illum, velit illo eaque voluptatum beatae
                                iusto officia.
                            </span>
                        </div>
                    </div>
                    <div className="comment">
                        <img
                            className="user-img"
                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                            alt="user"
                        />
                        <div className="comment-text">
                            <span className="username">Sven</span>
                            <span className="commentText">
                                mon commentaire Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Corrupti ea,
                                esse exercitationem cumque asperiores, quo
                                unde id illum at deleniti repellat quis.
                                Illum, velit illo eaque voluptatum beatae
                                iusto officia.
                            </span>
                        </div>
                    </div>
                    <div className="comment">
                        <img
                            className="user-img"
                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                            alt="user"
                        />
                        <div className="comment-text">
                            <span className="username">Sven</span>
                            <span className="commentText">
                                mon commentaire Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Corrupti ea,
                                esse exercitationem cumque asperiores, quo
                                unde id illum at deleniti repellat quis.
                                Illum, velit illo eaque voluptatum beatae
                                iusto officia.
                            </span>
                        </div>
                    </div>
                    <div className="comment">
                        <img
                            className="user-img"
                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                            alt="user"
                        />
                        <div className="comment-text">
                            <span className="username">Sven</span>
                            <span className="commentText">
                                mon commentaire Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Corrupti ea,
                                esse exercitationem cumque asperiores, quo
                                unde id illum at deleniti repellat quis.
                                Illum, velit illo eaque voluptatum beatae
                                iusto officia.
                            </span>
                        </div>
                    </div>
                    <div className="comment">
                        <img
                            className="user-img"
                            src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"
                            alt="user"
                        />
                        <div className="comment-text">
                            <span className="username">Sven</span>
                            <span className="commentText">
                                mon commentaire Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Corrupti ea,
                                esse exercitationem cumque asperiores, quo
                                unde id illum at deleniti repellat quis.
                                Illum, velit illo eaque voluptatum beatae
                                iusto officia.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
            }
            <Footer />
        </div>
    );
}

export default Video;
