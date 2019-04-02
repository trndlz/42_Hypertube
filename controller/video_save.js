const fetch = require('node-fetch');
const keys = require('../config/keys');

const removeDuplicates = (arr) => {
  arr = arr.map((movie, index) => {
    if (arr.findIndex(movieIndex => {
      return movieIndex.imdb_code === movie.imdb_code;
    }) === index) {
      return movie;
    }
  });
  let filtered = arr.filter(function (el) {
    return el != null;
  });
  return filtered;
}

const mergeArrays = (arr1, arr2) => {
  let result = []
  if (arr1)
    result.push(...arr1)
  if (arr2)
    result.push(...arr2)
  return result;
}

const rearangeData = (arr) => {
  arr = arr.map(movie => {
    movie.imdb_code = movie.imdb_id;
    delete movie.imdb_id;
    movie.large_cover_image = movie.images.poster;
    delete movie.images;
    movie.rating = movie.rating.percentage === 0 ? 5 : movie.rating.percentage / 10;
    delete movie.rating.percentage;
    return movie;
  })
}

const fetchMovies = (request) => {
    return new Promise(async (resolve, reject) => {
        fetch(request)
        .then(res => {
            console.log(res.url, res)
            resolve(res.json())
        })
        .catch(err => reject(err))
    });
}

const getVideoByPage = async (req, res, next) => {
  let category = req.query.category === "All Categories" ? "" : `&genre=${req.query.category}`;
  let order = ["year Asc", "title Desc", "rating Asc"].includes(req.query.sortBy) ? "desc" : "asc";
  let sortBy = req.query.sortBy.split(' ')[0];
  let requestPopcorn;
  let requestYts;
  let data = [];
  if (req.query.searchInput !== '') {
    let searchInput = req.query.searchInput;
    requestYts = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${req.query.page}&query_term=${searchInput}&order_by=${order}`;
    requestPopcorn = `https://tv-v2.api-fetch.website/movies/${req.query.page}?sort=${sortBy}&order=${order === 'desc' ? 1 : -1 }&keywords=${searchInput}`;
    data = [fetchMovies(requestYts), fetchMovies(requestPopcorn)];
    data = await Promise.all(data);
    rearangeData(data[1])
    data = mergeArrays(data[0].data.movies, data[1])
    data = removeDuplicates(data);
    res.json(data);
  } else {
    requestYts = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${req.query.page}&minimum_rating=${2 * req.query.stars - 2}${category}&order_by=${order}`;
    data = [fetchMovies(requestYts)]
    data = await Promise.all(data);
    res.json(data[0].data.movies);
  }
}

const getVideoByImdb = async (req, res, next) => {
  let requestPopcorn = `https://tv-v2.api-fetch.website/movie/${req.params.imdb}`;
  let requestYts = `https://yts.am/api/v2/list_movies.json?query_term=${req.params.imdb}`;
  let requestOmdb = `http://www.omdbapi.com/?i=${req.params.imdb}&apikey=${keys.omdb.key}`;
  // requestPopcorn = fetchMovies(requestPopcorn).catch(err => {console.log(err)})
  // console.log(requestPopcorn)
  // data={requestPopcorn}
  data = [fetchMovies(requestYts), fetchMovies(requestPopcorn), fetchMovies(requestOmdb)];
  data = await Promise.all(data);
  // if (Object.keys(data[1]).length)
  //   rearangeData([data[1]])
  data[0].data.movies[0].omdb = data[2];
  data[1].omdb = data[2];
  data = mergeArrays(data[0].data.movies, [data[1]])
  data = removeDuplicates(data);
  res.json({data: data[0]});
}

module.exports = exports = {
  getVideoByPage,
  getVideoByImdb,
};