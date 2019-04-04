import React, { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom'
import Footer from "../../partials/Footer";
import jwt from 'jsonwebtoken';

const Video = (props) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [data, setData] = useState({});
    const [stars, setStars] = useState([]);
    const [isLoading, setIsLoading] = useState(1);

    const postComment = async e => {
        e.preventDefault();
        // let controller = new AbortController();
        // const signal = controller.signal;
        const token = localStorage.getItem("jwt");
        const imdb = props.location.pathname.split("/")[2];
        let res = await fetch(`http://localhost:8145/comments/`,{
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            // signal,
            body: JSON.stringify({
                commentText: commentText,
                imdbId: imdb
            })
        });
        res = await res.json();
        if (res.success) {
            let jwtContent = jwt.decode(localStorage.getItem('jwt'));
            console.log(jwtContent);
            
            if (jwtContent) {
                res.comment.username = jwtContent.username;
                res.comment.userPicture = jwtContent.picture;
            }
            setComments([res.comment, ...comments]);
            setCommentText('');
        }
    }

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
                let commentsRes = await fetch(`http://localhost:8145/comments/movie/${imdb}`,{
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    // signal
                });
                commentsRes = await commentsRes.json();
                console.log(commentsRes)
                setData(res.data);
                setComments(commentsRes.comments.reverse());
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
                        src={jwt.decode(localStorage.getItem('jwt')) ? jwt.decode(localStorage.getItem('jwt')).picture + "/" + new Date().getTime() : "https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"}
                        alt="user"
                    />
                    <textarea
                        className="comment-area"
                        name=""
                        id=""
                        cols=""
                        rows="1"
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                    />
                    <button className="send-comment-btn" onClick={postComment}>Send</button>
                </div>
                <div className="video-comments">         
                {comments.length ? comments.map((comment, index) => {
                return (
                    <div className="comment" key={index}>
                        <Link to={`/profile/${comment.userId}`}>
                            <img
                                className="user-img"
                                src={comment.userPicture + "/" + new Date().getTime()}
                                alt="user"
                            />
                        </Link>
                        <div className="comment-text">
                            <div className="flex-arrange">
                                <span className="username"><Link to={`/profile/${comment.userId}`}>{comment.username}</Link></span>
                                <span className="comment-date">{new Date(parseInt(comment.date)).toISOString().split('.')[0].replace("T", " ").slice(0,16)}</span>
                            </div>
                           
                            <span>
                            {comment.comment}
                            </span>
                        </div>
                    </div>
                    )
                })
                : null}
                </div>
            </div>
            </Fragment>
            }
            <Footer />
        </div>
    );
}

export default Video;
