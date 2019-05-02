import React, { useEffect, useContext, useState } from "react";
import { SearchContext } from '../MainPage'
import internationalization from "../../../utils/internationalization";

const SearchBar = () => {
    const { search, setSearch, language } = useContext(SearchContext);
    const [searchInput, setSearchInput] = useState(search && search.searchInput ? search.searchInput : "");
    const [stars, setStars] = useState(search && search.stars ? search.stars : "1");
    const [category, setCategory] = useState(search && search.category ? search.category : "All Categories");
    const [sortBy, setSortBy] = useState(search && search.sortBy ? search.sortBy : "year Asc");
    const languageSwitcher = internationalization(language);

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
                    placeholder={languageSwitcher.search}
                    onChange={e => { setSearchInput(e.target.value) }}
                    onKeyPress={e => { if (e.which === 13) e.preventDefault() }}
                    value={searchInput}
                />
                <h5 className="search-title">{languageSwitcher.filterBy}</h5>
                <div className="rating">
                    <input
                        id="rating-5"
                        type="radio"
                        name="rating"
                        value="5"
                        onChange={e => setStars(e.target.value)}
                        checked={stars === "5"}
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
                        checked={stars === "4"}
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
                        checked={stars === "3"}

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
                        checked={stars === "2"}
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
                        checked={stars === "1"}
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
                        defaultValue={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="All Categories">
                            {languageSwitcher.allCategories}
                        </option>
                        {/* <option value="Popular">Popular</option> */}
                        <option value="Action">{languageSwitcher.action}</option>
                        <option value="Adventure">{languageSwitcher.adventure}</option>
                        <option value="Animation">{languageSwitcher.animation}</option>
                        <option value="Comedy">{languageSwitcher.comedy}</option>
                        <option value="Crime">{languageSwitcher.crime}</option>
                        <option value="Documentary">{languageSwitcher.documentary}</option>
                        <option value="Drama">{languageSwitcher.drama}</option>
                        <option value="Family">{languageSwitcher.family}</option>
                        <option value="Fantasy">{languageSwitcher.fantasy}</option>
                    </select>
                </div>
                <h5 className="search-title">{languageSwitcher.sortBy}</h5>
                <div className="select" style={{ marginTop: "1.5rem" }}>
                    <select
                        defaultValue={sortBy} id="sort-by"
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="year Asc">{languageSwitcher.yearAsc}</option>
                        <option value="year Desc">{languageSwitcher.yearDesc}</option>
                        <option value="title Asc">{languageSwitcher.titleAsc}</option>
                        <option value="title Desc">{languageSwitcher.titleDesc}</option>
                        <option value="rating Asc">{languageSwitcher.ratingAsc}</option>
                        <option value="rating Desc">{languageSwitcher.ratingDesc}</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;