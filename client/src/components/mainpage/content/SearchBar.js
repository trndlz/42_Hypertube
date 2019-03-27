import React, { useEffect, useContext, useState } from "react";
import { SearchContext } from '../MainPage'

const SearchBar = () => {
    const { setSearch } = useContext(SearchContext);
    const [searchInput, setSearchInput] = useState("");
    const [stars, setStars] = useState("1");
    const [category, setCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("year Asc");
    // const [dateFrom, setDateFrom] = useState("2000");
    // const [dateTo, setDateTo] = useState("2019");
    
    // const getYears = () => {
    //     let table = [];
    //     for (let i = 2019; i >= 1895; i--) {
    //         table.push(<option value={i} key={i}>{i}</option>);
    //     }
    //     return table;
    // }

    useEffect(() => {
        setSearch({
            searchInput,
            stars,
            category,
            sortBy
        })
    }, [searchInput, stars, category, sortBy])

    return (
        <div className="search-bar" id="test">
            <form>
                <input
                    className="search-input input-type-2"
                    type="text"
                    placeholder="Search"
                    onChange={e => { setSearchInput(e.target.value) }}
                    onKeyPress={e => {if (e.which === 13) e.preventDefault()}}
                    value={searchInput}
                />
                <h5 className="search-title">Filter By</h5>
                <div className="rating">
                    <input
                        id="rating-5"
                        type="radio"
                        name="rating"
                        value="5"
                        onChange={e => setStars(e.target.value)}
                    />
                    <label htmlFor="rating-5">
                        <i className="fas fa-star" />
                    </label>
                    <input
                        id="rating-4"
                        type="radio"
                        name="rating"
                        value="4"
                        onChange={e => setStars(e.target.value)}
                    />
                    <label htmlFor="rating-4">
                        <i className="fas fa-star" />
                    </label>
                    <input
                        id="rating-3"
                        type="radio"
                        name="rating"
                        value="3"
                        onChange={e => setStars(e.target.value)}
                    />
                    <label htmlFor="rating-3">
                        <i className="fas fa-star" />
                    </label>
                    <input
                        id="rating-2"
                        type="radio"
                        name="rating"
                        value="2"
                        onChange={e => setStars(e.target.value)}
                    />
                    <label htmlFor="rating-2">
                        <i className="fas fa-star" />
                    </label>
                    <input
                        id="rating-1"
                        type="radio"
                        name="rating"
                        value="1"
                        onChange={e => setStars(e.target.value)}
                    />
                    <label htmlFor="rating-1">
                        <i className="fas fa-star" />
                    </label>
                </div>
                {/* <div className="dates">
                    <div className="select">
                        <select
                            defaultValue="2000"
                            onChange={e => setDateFrom(e.target.value)}
                        >
                        {getYears()}
                        </select>
                    </div>
                    <div className="select">
                        <select
                            defaultValue="2019"
                            onChange={e => setDateTo(e.target.value)}
                        >
                        {getYears()}
                        </select>
                    </div>
                </div> */}
                <div className="select" style={{ marginBottom: "0" }}>
                    <select
                        defaultValue="All Categories"
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="All Categories">
                            All Categories
                        </option>
                        {/* <option value="Popular">Popular</option> */}
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Drama">Drama</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                </div>
                <h5 className="search-title">Sort By</h5>
                <div className="select" style={{ marginTop: "1.5rem" }}>
                    <select 
                        defaultValue="year Asc" id="sort-by"
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="year Asc">Date (Newer)</option>
                        <option value="year Desc">Date (Older)</option>
                        <option value="title Asc">Name (A-Z)</option>
                        <option value="title Desc">Name (Z-A)</option>
                        <option value="rating Asc">Stars (Best)</option>
                        <option value="rating Desc">Stars (Worst)</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;