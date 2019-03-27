import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { SearchContext } from "../MainPage";
import Footer from "../../partials/Footer";

const Gallery = (props) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(1);
    const { search } = useContext(SearchContext);

    useEffect(() => {
        let controller;
        (async () => {
            const token = localStorage.getItem("jwt");
            controller = new AbortController();
            const signal = controller.signal;
            let page = 1; //! FAIRE LES PAGES
            try {
                if (search.dateTo < search.dateFrom) {
                    [search.dateTo, search.dateFrom] = [search.dateFrom, search.dateTo];
                }
                let res = await fetch(`http://localhost:8145/video?page=${page}&searchInput=${search.searchInput}&stars=${search.stars}&dateFrom=${search.dateFrom}&dateTo=${search.dateTo}&category=${search.category}&sortBy=${search.sortBy}`,{      
                // console.log(search); 
                // let res = await fetch(`http://localhost:8145/video?page=${page}&searchInput=${search.searchInput}&stars=${search.stars}&category=${search.category}&sortBy=${search.sortBy}`,{
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    search,
                    signal
                });
                res = await res.json();
                console.log(res)
                setData(res.data);
                setIsLoading(0)
            } catch (err) {}
        })();
        return () => {
            controller.abort();
        };
    }, [search])

    return (
        <Fragment>
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
                <div className="padding-wrapper">
                { Object.keys(data).length !== 0 && data.data && data.data.movies ? data.data.movies.map((film, index) => {
                    let stars = [];
                    for (let i=0; i < 5; i++) {
                        if (i <= Math.trunc(film.rating / 2)) {
                            stars.push(<i className="fas fa-star yellow-star" key={i} />);
                        } else {
                            stars.push(<i className="fas fa-star" key={i} />);
                        }
                    }
                    return (
                        <Link to={`/video/${film.imdb_code}`} key={index}>
                            <div className="film">
                                <div className="film-min unseen">
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
                        </Link>
                    )
                    }) : null } 
                    {/* <div className="film">
                        <div className="film-min seen">
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
                    </div> */}
                </div>
                }
                <Footer />
            </div>
        </Fragment>
    );
}

export default Gallery;