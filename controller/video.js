const fetch = require('node-fetch');
const keys = require('../config/keys');

const getVideoByPage = async (req, res, next) => {
  let data = await fetch(`https://yts.am/api/v2/list_movies.json?sort_by=year&limit=50&page=${req.params.page}`);
  data = await data.json();
  res.json({ data });
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
