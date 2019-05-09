import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { SearchContext } from "../MainPage";
import Footer from "../../partials/Footer";
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from "./SearchBar";

const Gallery = () => {
    const [isLoading, setIsLoading] = useState(1);
    const [newPage, setNewPage] = useState(1);
	const { search } = useContext(SearchContext);
    const [hasMore, setHasMore] = useState(true);
    const [moviesArr, setMoviesArr] = useState([]);
    // let cont = new AbortController();
    // cont.test = "a" + search.searchInput;
	const [controller, setController] = useState(new AbortController());

    const fetchMovies = async (page) => {
        const token = localStorage.getItem("jwt");
        try {
            let res = await fetch(`http://localhost:8145/video?page=${newPage}&searchInput=${search.searchInput}&stars=${search.stars}&dateFrom=${search.dateFrom}&dateTo=${search.dateTo}&category=${search.category}&sortBy=${search.sortBy}`,{      
                headers: { Authorization: "Bearer " + token },
                signal: controller.signal,
            });
            res = await res.json();
            if (res.isAuthenticated !== false) {
				
                let arr = [];
                if (res.length !== 0) {
                    res.map((film, index) => {
                        let stars = [];
                        for (let i=0; i < 5; i++) {
                            if (i <= Math.trunc(film.rating / 2)) {
                                stars.push(<i className="fas fa-star yellow-star" key={i} />);
                            } else {
                                stars.push(<i className="fas fa-star" key={i} />);
                            }
                        }
                        arr.push(<Link to={`/video/${film.imdb_code}`} key={index + ' ' + page}>
                            <div className="film">
                                <div className={film.isSeen ? "film-min seen" : "film-min unseen"}>
                                    <img
                                        src={film.large_cover_image}
                                        alt=""
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                <div className="film-infos">
                                    {film.title}{" "}
                                    <span className="film-infos-date">({film.year})</span>
                                    <br />
                                    {[...stars]}
                                </div>
                            </div>
                        </Link>)
                        return '';
                    })
                        setMoviesArr([...moviesArr, ...arr]);
                } else {
                        setHasMore(false);
                }
                    setNewPage(newPage + 1);
                    setIsLoading(0);
            } else {
                window.location.reload();
            }
        } catch (err) {}
    }
    
    useEffect(() => {
        if (Object.keys(search).length) {
            setNewPage(1);
            setMoviesArr([]);
            setIsLoading(0);
            setHasMore(true);
        }
        controller.abort();
        setController(new AbortController());
    }, [search])
    
    
    useEffect(() => {
        return () => {
            controller.abort();
        };
    }, [controller])

    return (
        <Fragment>
            <SearchBar />
            <div className="main-content-wrapper">
            {!isLoading ?
                <InfiniteScroll
                    pageStart={0}
                    loadMore={fetchMovies}
                    hasMore={hasMore}
                    loader={<div className="cs-loader" style={{height: newPage !== 1 ? "5rem" : null}} key={0}>
                {/* //    loader={<div className="cs-loader" key={0}> */}
                                <div className="cs-loader-inner">
                                    <label>●</label>
                                    <label>●</label>
                                    <label>●</label>
                                    <label>●</label>
                                    <label>●</label>
                                    <label>●</label>
                                </div>
                            </div>}
                    useWindow={false}
                >
                    <div className="padding-wrapper">
                        {moviesArr}
                    </div>
                </InfiniteScroll>
                : null}
                <Footer />
            </div>
        </Fragment>
    );
}

export default Gallery;