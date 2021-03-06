import React, { Fragment, useState } from "react";
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
	const [language, setLanguage] = useState(localStorage.getItem("language") || 'en');

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

	return (
		<Fragment>
			{renderRedirect() ?
				<Redirect to="/" /> :
				<Fragment>
					<Header language={language}/>
					<main className="mainpage">
						{ 
							!/^\/profile\/(.+)$/.test(props.location.pathname) &&
							!/^\/video(\/.*)?$/.test(props.location.pathname) &&
							!/^\/settings\/?$/.test(props.location.pathname) &&
							<>
								<input type="checkbox" name="test" id="checkbox" />
								<label className="label-check" htmlFor="checkbox">
									Search Options <i className="fas fa-arrow-circle-down" />
								</label>
							</>
						}
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