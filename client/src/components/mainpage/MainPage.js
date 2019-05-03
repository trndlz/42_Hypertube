import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Gallery from "./content/Gallery";
import Profile from "./content/Profile";
import Settings from "./content/Settings";
import Video from "./content/Video";
import Header from "../partials/Header";
import ProtectedRoute from "../../utils/protectedRoute";

export const SearchContext = React.createContext();

const MainPage = props => {
	const [search, setSearch] = useState({});
	const [language, setLanguage] = useState({});

	const renderRedirect = () => {
		if (
			!localStorage.getItem("jwt") || (
				!/^\/profile\/(.+)$/.test(props.location.pathname) &&
				!/^\/video(\/.*)?$/.test(props.location.pathname) &&
				!/^\/settings\/?$/.test(props.location.pathname) &&
				props.location.pathname !== "/")
		) {
			return true;
		} else { return false }
	};

	// const fetchUserLanguage = async () => {
	// 	const token = localStorage.getItem("jwt");
	// 	const controller = new AbortController();
	// 	const signal = controller.signal;
	// 	const userProfile = fetch("http://localhost:8145/settings", {
	// 		method: "GET",
	// 		headers: { Authorization: "Bearer " + token },
	// 		signal
	// 	}).
	// 	const userProfileJson = await userProfile.json();
	// 	userProfileJson.language !== undefined ? setLanguage(userProfileJson.language) : setLanguage('en');
	// }

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		const controller = new AbortController();
		const signal = controller.signal;
		fetch("http://localhost:8145/settings", {
			method: "GET",
			headers: { Authorization: "Bearer " + token },
			signal
		})
		  .then(response => response.json())
		  .then(userData => {
			  console.log("COUCOU", userData.language)
			  setLanguage(userData.language)
			});
	  });
	  
	console.log("language", language);

	return (
		<Fragment>
			{renderRedirect() ?
				<Redirect to="/" /> :
				<Fragment>
					<Header />
					<main className="mainpage">
						<input type="checkbox" name="test" id="checkbox" />
						<label className="label-check" htmlFor="checkbox">
							Search Options <i className="fas fa-arrow-circle-down" />
						</label>
						<SearchContext.Provider value={{ search, setSearch, language, setLanguage }}>
							<ProtectedRoute exact path="/" component={Gallery} />
							<ProtectedRoute exact path="/profile/:id" component={Profile} />
							<ProtectedRoute exact path="/settings" component={Settings} />
							<ProtectedRoute exact path="/video/:imdb" component={Video} />
						</SearchContext.Provider>
					</main>
				</Fragment>
			}
		</Fragment>
	);
};

export default MainPage;