const fetch = require('node-fetch');
const keys = require('../config/keys');
const sort = require('fast-sort');

const getVideoByPage = async (req, res, next) => {
  // console.log(req.query);
  //YST.AM/api
  //page: '1',                    page=INT
  //searchInput: '',              query_term=MOVIENAME
  //stars: '1',                   minimum_rating=[0-9]
  //category: 'undefined',        genre=lenomdugenre
  //sortBy: 'Date'                sort_by= title, year, rating

  let category = req.query.category === "All Categories" ? "" : `&genre=${req.query.category}`;
  let order = ["year Asc", "title Desc", "rating Asc"].includes(req.query.sortBy) ? "desc" : "asc";
  let sortBy = req.query.sortBy.split(' ')[0];
  let request;
  let data;
  let dataDate = [];
  if (req.query.searchInput !== ''){
    let searchInput = `&query_term=${req.query.searchInput}`;
    request = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${req.query.page}${searchInput}&order_by=${order}`;
    // request = `https://tv-v2.api-fetch.website/movies/1`
    try{
      data = await fetch(request);
      // console.log("DATA", data)
      console.log("DATA", data)
      data = await data.json();
    }catch (err){
      console.log(err)
    }
    res.json({ data });
  } 
  else {
    let searchInput = `&query_term=${i}`;    
    request = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${req.query.page}&minimum_rating=${2 * req.query.stars - 2}${category}&order_by=${order}`;
    data = await fetch(request);
    data = await data.json();
    res.json({ data });
    // try {
    //   for (let i = req.query.dateFrom; i <= req.query.dateTo; i++) {
    //     const fetchMovies = () => {
    //       return new Promise(async (resolve, reject) => {
    //         let searchInput = `&query_term=${i}`;    
    //           request = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${req.query.page}${searchInput}&minimum_rating=${2 * req.query.stars - 2}${category}&order_by=${order}`;
    //           fetch(request).then((res) => console.log(res));
    //            resolve(res.json()).catch(err => reject(err))
    //       });
    //     }
    //     dataDate.push(fetchMovies());
    //   }
    //   let arr = await Promise.all(dataDate);
    //   let tmpData = [];
    //   for (let i of arr) {
    //       tmpData = [...tmpData, ...i.data.movies];
    //   }
    //   arr[0].data.movies = tmpData;

      
    //   //SORT   YEAR TITLE RATING
    //   // switch(req.query.sortBy) {
    //   //   case 'title Asc':
    //   //     sort(arr[0].data.movies).asc(arr => arr.title)
    //   //     break;
    //   //   case 'title Desc':
    //   //     sort(arr[0].data.movies).desc(arr => arr.title)
    //   //     break;
    //   //   case 'rating Asc':
    //   //     sort(arr[0].data.movies).asc(arr => arr.title)
    //   //     break;
    //   //   case 'rating Desc':
    //   //     sort(arr[0].data.movies).asc(arr => arr.title)
    //   //     break;
    //   // }
    //   arr[0].data.movies = arr[0].data.movies.slice(0,50);
    //   res.json({ data: arr[0] });
    // } catch (e) {
    //   console.log(e);
      
    // }
  }
}

const getVideoByImdb = async (req, res, next) => {
  let data = await fetch(`https://yts.am/api/v2/list_movies.json?query_term=${req.params.imdb}`);
  data = await data.json();  
  let omdb = await fetch(`http://www.omdbapi.com/?i=${req.params.imdb}&apikey=${keys.omdb.key}`);
  omdb = await omdb.json();
  data.data.movies[0].omdb = omdb;
  res.json({ data: data.data.movies[0] });
}

module.exports = exports = {
  getVideoByPage,
  getVideoByImdb,
};
