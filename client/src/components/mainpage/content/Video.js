import React, { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom'
import Footer from "../../partials/Footer";
import jwt from 'jsonwebtoken';
import { validateComment } from "../../../validation/validation";
import Loader from "./Loader";

// const MemoComment = React.memo(props => {
//     let comment = props.comment;
//     let { index } = props.index;
//     let { date } = props.date;
//     return (
//         <div className="comment" key={index}>
//             <Link to={`/profile/${comment.userId}`}>
//                 <img
//                     className="user-img"
//                     src={/^http:\/\/localhost.*/.exec(comment.userPicture) ? comment.userPicture + "/" + date : comment.userPicture}
//                     alt="user"
//                 />
//             </Link>
//             <div className="comment-text">
//                 <div className="flex-arrange">
//                     <span className="username"><Link to={`/profile/${comment.userId}`}>{comment.username}</Link></span>
//                     <span className="comment-date">{new Date(parseInt(comment.date)).toISOString().split('.')[0].replace("T", " ").slice(0, 16)}</span>
//                 </div>
//                 {comment.comment.split('\n').map((line, i) => {
//                     return (
//                         <span key={i}>
//                             {line}
//                             <br />
//                         </span>
//                     )
//                 })}
//             </div>
//         </div>
//     );
// });

const Video = (props) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [data, setData] = useState({});
    const [stars, setStars] = useState([]);
    const [isLoading, setIsLoading] = useState(1);
    const [date] = useState(Date.now());

    const postComment = async e => {
        e.preventDefault();
        // let controller = new AbortController();
        // const signal = controller.signal;
        let trimmedComment = commentText.trim();
        if (validateComment(trimmedComment)) {
            const token = localStorage.getItem("jwt");
            const imdb = props.location.pathname.split("/")[2];
            let res = await fetch(`http://localhost:8145/comments/`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                },
                // signal,
                body: JSON.stringify({
                    commentText: trimmedComment,
                    imdbId: imdb
                })
            });
            res = await res.json();
            if (res.success) {
                let jwtContent = jwt.decode(localStorage.getItem('jwt'));
                if (jwtContent) {
                    res.comment.username = jwtContent.username;
                    res.comment.userPicture = jwtContent.picture;
                }
                const textArea = document.querySelector('#textArea');
                textArea.style.height = '40px';
                setComments([res.comment, ...comments]);
            }
        }
        setCommentText('');
    }

    const handleOnInput = (e) => {
        const textArea = document.querySelector('#textArea');
        textArea.style.height = '40px';
        textArea.style.height = (textArea.scrollHeight) + 'px';
    }

    const handleOnKeyPress = e => {
        if (e.which === 13 && !e.shiftKey) {
            postComment(e);
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
                let res = await fetch(`http://localhost:8145/video/${imdb}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    signal
                });
                res = await res.json();
                console.log(res)
                if (res.isAuthenticated !== false) {
                    let commentsRes = await fetch(`http://localhost:8145/comments/movie/${imdb}`, {
                        headers: {
                            Authorization: "Bearer " + token
                        },
                        // signal
                    });
                    commentsRes = await commentsRes.json();
                    setData(res.data);
                    setComments(commentsRes.comments.reverse());
                    setIsLoading(0);
                } else {
                    window.location.reload();
                }
            } catch (err) { }
        })();
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        let starsArray = [];
        for (let i = 0; i < 5; i++) {
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
                <Loader/>
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
                                <br />
                                Actors:{" "}{data.omdb ? data.omdb.Actors : null}
                            </div>
                        </div>
                    </div>
                    <div className="video-wrapper">
						<video id="videoPlayer" controls>
							<source src="http://localhost:8145/torrent/random" type="video/mp4" />
						</video>
                    </div>
                    <div className="comment-wrapper">
                        <div className="your-comment">
                            <img
                                className="user-img"
                                src={jwt.decode(localStorage.getItem('jwt')) ? /^http:\/\/localhost.*/.exec(jwt.decode(localStorage.getItem('jwt')).picture) ? jwt.decode(localStorage.getItem('jwt')).picture + "/" + date : jwt.decode(localStorage.getItem('jwt')).picture : "https://bikeandbrain.files.wordpress.com/2015/05/face.jpg"}
                                alt="user"
                            />
                            <textarea
                                maxLength="1000"
                                className="comment-area"
                                name=""
                                id="textArea"
                                cols=""
                                rows="1"
                                value={commentText}
                                onChange={e => setCommentText(e.target.value)}
                                onInput={handleOnInput}
                                onKeyPress={handleOnKeyPress}
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
                                                src={/^http:\/\/localhost.*/.exec(comment.userPicture) ? comment.userPicture + "/" + date : comment.userPicture}
                                                alt="user"
                                            />
                                        </Link>
                                        <div className="comment-text">
                                            <div className="flex-arrange">
                                                <span className="username"><Link to={`/profile/${comment.userId}`}>{comment.username}</Link></span>
                                                <span className="comment-date">{new Date(parseInt(comment.date)).toISOString().split('.')[0].replace("T", " ").slice(0, 16)}</span>
                                            </div>
                                            {comment.comment.split('\n').map((line, i) => {
                                                return (
                                                    <span key={i}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    // <MemoComment comment={comment} index={index} date={date} />
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