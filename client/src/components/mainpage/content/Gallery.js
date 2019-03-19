import React, { Fragment, useEffect } from "react";
import Footer from "../../partials/Footer";
import imgCover from "../../../images/spiderman-img.jpg";
import queryString from 'query-string';

const Gallery = (props) => {
    useEffect(() => {
        (async () => {
            const parsed = queryString.parse(props.location.search);
            if (parsed.token) {
                localStorage.setItem('jwt', parsed.token);
                console.log(parsed.token)
            }
        })();
    }, [])
    return (
        <Fragment>
            <div className="main-content-wrapper">
                <div className="padding-wrapper">
                    <div className="film">
                        <div className="film-min seen">
                            <img
                                src={imgCover}
                                alt=""
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className="film-infos">
                            SpiderMan et le bouffon vert{" "}
                            <span className="film-infos-date">(1992)</span>
                            <br />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min unseen">
                            <img
                                src={imgCover}
                                alt=""
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className="film-infos">
                            SpiderMan et le bouffon vert 2(1992)
                            <br />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min ">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                    <div className="film">
                        <div className="film-min">
                            <h3>SpiderMan</h3>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
}

export default Gallery;