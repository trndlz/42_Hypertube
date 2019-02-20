import React, { Component } from "react";
import Footer from "../../partials/Footer";
import imgCover from "../../../images/spiderman-img.jpg";

class Video extends Component {
    render() {
        return (
            <div className="main-content-wrapper">
                <div className="video-description">
                    <img className="video-img" src={imgCover} alt="" />
                    <div className="video-info">
                        <h2 className="video-title">
                            SpiderMan <span className="video-date">(1992)</span>
                        </h2>
                        <div className="video-rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                        </div>
                        <div className="video-time">1h30</div>
                        <span className="separator" />
                        <div className="video-desc">
                            <h6>Description:</h6>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatem tempore labore fugit? Quia ea,
                            nostrum maxime incidunt eveniet unde quos dolores
                            voluptatum inventore corrupti facere! Nam sequi qui
                            quod pariatur.
                        </div>

                        <div className="video-actors">
                            <h6>Casting:</h6>
                            SpiderMan et dautres gars Lorem ipsum Lorem, ipsum
                            dolor sit amet consectetur adipisicing elit. Sint
                            voluptatibus in ad nobis dolo{" "}
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
                <Footer />
            </div>
        );
    }
}

export default Video;
