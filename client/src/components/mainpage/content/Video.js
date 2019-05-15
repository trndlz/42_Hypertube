import React, { useEffect, useState, Fragment, useContext, useRef } from "react";
import { Link } from 'react-router-dom'
import Footer from "../../partials/Footer";
import jwt from 'jsonwebtoken';
import { validateComment } from "../../../validation/validation";
import Loader from "./Loader";
import internationalization from "../../../utils/internationalization";
import { SearchContext } from "../MainPage";

const Video = (props) => {
	let isMounted = useRef(false);
	let videoFirstPlay = useRef(true);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);
	const [data, setData] = useState({});
	const [stars, setStars] = useState([]);
	const [subtitles, setSubtitles] = useState([]);
	const [intlDescriptions, setIntlDescriptions] = useState([]);
	const [hash, setHash] = useState("");
	const [isLoading, setIsLoading] = useState(1);
	const [date] = useState(Date.now());
	const { language } = useContext(SearchContext);
	const languageSwitcher = internationalization(language);

	const postComment = async e => {
		e.preventDefault();
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
				body: JSON.stringify({
					commentText: trimmedComment,
					imdbId: imdb
				})
			});
			if (isMounted.current){
				res = await res.json();
				if (res.success) {
					let jwtContent = jwt.decode(localStorage.getItem('jwt'));
					if (jwtContent) {
						res.comment.username = jwtContent.username;
						res.comment.userPicture = jwtContent.picture;
					}
					const textArea = document.querySelector('#textArea');
					textArea.style.height = '40px';
					if (isMounted.current) {
						setComments([res.comment, ...comments]);
					}
				}
			}
		}
		if (isMounted.current) {
			setCommentText('');
		}
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
		isMounted.current = true;
		(async () => {
			const token = localStorage.getItem("jwt");
			const imdb = props.location.pathname.split("/")[2];
			controller = new AbortController();
			const signal = controller.signal;
			try {
				let res = await fetch(`http://localhost:8145/video/${imdb}/${language}`, {
					headers: {
						Authorization: "Bearer " + token
					},
					signal
				});
				if (isMounted.current){
					res = await res.json();
					if (res.isAuthenticated !== false) {
						let commentsRes = await fetch(`http://localhost:8145/comments/movie/${imdb}`, {
							headers: { Authorization: "Bearer " + token },
						});
						commentsRes = await commentsRes.json();
						let availableSubtitles = await fetch(`http://localhost:8145/torrent/subtitles/${imdb}`, {
							headers: { Authorization: "Bearer " + token }
						});
						availableSubtitles = await availableSubtitles.json();
						if (isMounted.current) {
							setSubtitles(availableSubtitles);
							setData(res.data);
							setIntlDescriptions(res.languageDescriptions);
							setHash(res.data.torrents[0].hash);
							setComments(commentsRes.comments.reverse());
							setIsLoading(0);
						}
						var video = document.querySelector('video');
						video.oncanplay = () => {
							if (videoFirstPlay.current) {
								video.muted = true;
								videoFirstPlay.current = false;
							}
							if (video.paused){
								video.play()
							}
						};
						if (video) {
							let videoSeen = 0;
							video.addEventListener('timeupdate', e => {
								let ratio = video.currentTime * 100 / video.duration;
								if (ratio >= 95 && !videoSeen) {
									videoSeen = 1;
									fetch(`http://localhost:8145/profile/videoSeen`, {
										method: 'POST',
										headers: { 
											Authorization: "Bearer " + token,
											"Content-Type": "application/json"
										},
										body: JSON.stringify({imdbId: imdb})
									});
								}
							});
						}
					} else {
						window.location.reload();
					}
				}
			} catch (err) {}
		})();
		return () => {
			controller.abort();
			isMounted.current = false;
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
		if (isMounted.current) {
			setStars(starsArray);
		}
	}, [data]);

	const minToHour = min => {
		let hour = Math.trunc(min / 60);
		min = min % 60;
		return hour && min ? `${hour}h ${min}min` : 'N/A';
	}

	const movieHashByQuality = (data) => data.torrents.map((torrent, index) =>
		<button className="quality-buttons" key={index} onClick={() => isMounted.current && setHash(torrent.hash)}>
			{torrent.quality} {torrent.type}
		</button>
	);

	const streamUrl = "http://localhost:8145/torrent/" + hash;

	const subtitlesTracks = (subtitles) => subtitles.map((subtitle, index) =>
		<track
			key={index}
			src={`../subtitles/${subtitle.fileName}`}
			label={subtitle.lang}
			kind="subtitles"
			srcLang={subtitle.langShort}
		/>
	);

	const printAvailableSubtitles = (subtitles) => subtitles.map((subtitle, index) => <span key={index}>{languageSwitcher[subtitle.langShort]}&nbsp;</span>);

	return (
		<div className="main-content-wrapper">
			{isLoading ?
				<Loader />
				:
				<Fragment>
					<div className="video-description">
						<img className="video-img" src={data.large_cover_image} alt="" />
						<div className="video-info">
							<h2 className="video-title">
								{intlDescriptions && intlDescriptions.title ? intlDescriptions.title : data.title} <span className="video-date">({data.year})</span>
							</h2>
							<div className="video-rating">
								{[...stars]}
							</div>
							<div className="video-time">{minToHour(data.runtime)}</div>
							<span className="separator" />
							<div className="video-desc">
								{intlDescriptions && intlDescriptions.overview ? intlDescriptions.overview : languageSwitcher.unavailableOverview}
							</div>
							<div className="video-actors">
								{languageSwitcher.director}:{" "}{data.omdb ? data.omdb.Director : null}
								<br />
								{languageSwitcher.actors}:{" "}{data.omdb ? data.omdb.Actors : null}
							</div>
							<div>
								{movieHashByQuality(data)}
							</div>
							{subtitles.length > 0 &&
								<div>
									{languageSwitcher.availableSubtitles} : {printAvailableSubtitles(subtitles)}
								</div>}
						</div>
					</div>
					<div className="video-wrapper">
						<video key={streamUrl} controls className="my-video" controlsList="nodownload">
							<source src={streamUrl} type="video/mp4" />
							{subtitlesTracks(subtitles)}
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
								onChange={e => isMounted.current && setCommentText(e.target.value)}
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