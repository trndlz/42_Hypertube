import React, { Component } from 'react';
import $ from 'jquery';
import './searchBar.css';

class Sidebar extends Component {
  componentDidMount() {
    let searchIcon = document.querySelector(".search-icon");
    $("#searchby").on("hide.bs.collapse", e => {
      searchIcon.className = "fas fa-arrow-circle-down";
    });
    $("#searchby").on("show.bs.collapse", e => {
      searchIcon.className = "fas fa-arrow-circle-up";
      $("#sortby").collapse('hide');
    });
    let sortIcon = document.querySelector(".sort-icon");
    $("#sortby").on("hide.bs.collapse", e => {
      sortIcon.className = "fas fa-arrow-circle-down";
    });
    $("#sortby").on("show.bs.collapse", e => {
      sortIcon.className = "fas fa-arrow-circle-up";
      $("#searchby").collapse('hide');
    });
  }

  selectSortBy = (e) => {
    e.preventDefault();
    let sortByBtn = document.querySelector(".sortbybtn");
    sortByBtn.childNodes[0].nodeValue = `Sort By ${e.target.innerText === "None" ? "" : e.target.innerText}`
  }
  render() {
    return (
      <div className="searchBar">
        <form>
          <button className="btn btn-secondary searchbtn" type="button" data-toggle="collapse" data-target="#searchby" aria-expanded="false" aria-controls="searchby">
            Search <i className="search-icon fas fa-arrow-circle-down"/>
          </button>
          <div className="collapse" id="searchby">
            <div className="card card-body">
              <div id="search-content">
                <input type="text" placeholder="Search" className="form-control" />
                <div className="rating">
                  <input id="rating-5" type="radio" name="rating" value="5"/>
                  <label htmlFor="rating-5">
                    <i id="star-5" className="fas fa-star"/></label>
                  <input id="rating-4" type="radio" name="rating" value="4"/>
                  <label htmlFor="rating-4">
                    <i id="star-5" className="fas fa-star"/></label>
                  <input id="rating-3" type="radio" name="rating" value="3"/>
                  <label htmlFor="rating-3">
                    <i id="star-5" className="fas fa-star"/></label>
                  <input id="rating-2" type="radio" name="rating" value="2"/>
                  <label htmlFor="rating-2">
                    <i id="star-5" className="fas fa-star"/></label>
                  <input id="rating-1" type="radio" name="rating" value="1"/>
                  <label htmlFor="rating-1">
                    <i id="star-5" className="fas fa-star"/>
                  </label>
                </div>
                <div id="date">
                  <select className="select-date form-control" defaultValue="2000">
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                  </select>
                  <select className="select-date form-control">
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                </select>
                </div>
                <select className="select-genre form-control" id="" defaultValue="2000">
                  <option value="Popular">Popular</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animation</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Crime">Crime</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Drama">Drama</option>
                  <option value="Family">Damily</option>
                  <option value="Fantasy">Fantasy</option>
                </select>
              </div>
            </div>
          </div>
        </form>
          {/* <input type="text" placeholder="Search" className="form-control searchBy" /> */}
          {/* <select className="select-date form-control sortBy" defaultValue="2000">
              <option value="None">None</option>
              <option value="Name">Name</option>
              <option value="Genre">Genre</option>
              <option value="Stars">Stars</option>
              <option value="Date">Date</option>
          </select> */}
          {/* <button className="btn btn-secondary allmovies-btn">All Movies</button> */}
          <button className="btn btn-secondary searchbtn sortbybtn sortBy" type="button" data-toggle="collapse" data-target="#sortby" aria-expanded="false" aria-controls="sortby">
            Sort By <i className="sort-icon fas fa-arrow-circle-down"/>
          </button>
          
          <div className="collapse" id="sortby">
            <button onClick={this.selectSortBy} className="btn btn-secondary sort-option-btn">None</button>
            <button onClick={this.selectSortBy} className="btn btn-secondary sort-option-btn">Name</button>
            <button onClick={this.selectSortBy} className="btn btn-secondary sort-option-btn">Genre</button>
            <button onClick={this.selectSortBy} className="btn btn-secondary sort-option-btn">Stars</button>
            <button onClick={this.selectSortBy} className="btn btn-secondary sort-option-btn">Date</button>
          </div>
      </div>
    )
  }
}

export default Sidebar;