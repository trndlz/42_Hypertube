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

  //POPCORN TIME
  //sortBy                        sort= year, rating, title
  //DESC ASC                      order=1 , -1






  let category = req.query.category === "All Categories" ? "" : `&genre=${req.query.category}`;
  let order = ["year Asc", "title Desc", "rating Asc"].includes(req.query.sortBy) ? "desc" : "asc";
  let sortBy = req.query.sortBy.split(' ')[0];
  let request;
  let dataYts;
  let dataPopcorn;
  if (req.query.searchInput !== '') {
    let searchInput = req.query.searchInput;
    requestYts = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${req.query.page}&query_term=${searchInput}&order_by=${order}`;
    requestPopcorn = `https://tv-v2.api-fetch.website/movies/${req.query.page}?sort=${sortBy}&order=${order === 'desc' ? 1 : -1 }&keywords=${searchInput}`

    const fetchMovies = (request) => {
      return new Promise(async (resolve, reject) => {
        fetch(request).then(res => resolve(res.json())).catch(err => reject(err))
      });
    }

    // dataYts = await fetch(requestYts);
    // dataPopcorn = await fetch(requestPopcorn);
    // dataYts = await dataYts.json();
    // dataPopcorn = await dataPopcorn.json();

    let data = [fetchMovies(requestYts), fetchMovies(requestPopcorn)];
    data = await Promise.all(data);
    // console.log(data)

    data[1] = data[1].map(movie => {
      movie.imdb_code = movie.imdb_id;
      delete movie.imdb_id;
      movie.large_cover_image = movie.images.poster;
      delete movie.images;
      movie.rating = movie.rating.percentage === 0 ? 5 : movie.rating.percentage / 10;
      delete movie.rating.percentage;
      return movie;
    })
    let result = []
    if (data[0].data.movies)
      result.push(...data[0].data.movies)
    if (data[1])
      result.push(...data[1])
    result = result.map((movie, index) => {
      if (result.findIndex(movieIndex => {
          return movieIndex.imdb_code === movie.imdb_code;
        }) === index) {
        return movie;
      }
    });
    var filtered = result.filter(function (el) {
      return el != null;
    });

    // res.json([...data[1], ...data[0].data.movies]);
    // console.log(result)
    res.json(filtered);

    // console.log(dataYts.data.movies);

    // let mergedData = [...dataYts.data.movies, ...dataPopcorn];
    // let mergedData = [...data[1], ...data[0]];

    // res.json([...dataYts.data.movies, ...dataPopcorn]);

    // let popcorn = {};
    // popcorn.data={}
    // popcorn.data.movies = data;
    // popcorn.data.imdb_id
    // res.json({data: popcorn});
  } else {
    let data;
    request = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${req.query.page}&minimum_rating=${2 * req.query.stars - 2}${category}&order_by=${order}`;
    data = await fetch(request);
    data = await data.json();
    res.json(data.data.movies);
    // let searchInput = `&query_term=${i}`;    
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
    //  switch(req.query.sortBy) {
    //   case 'title Asc':
    //     sort(arr[0].data.movies).asc(arr => arr.title)
    //     break;
    //   case 'title Desc':
    //     sort(arr[0].data.movies).desc(arr => arr.title)
    //     break;
    //   case 'rating Asc':
    //     sort(arr[0].data.movies).asc(arr => arr.title)
    //     break;
    //   case 'rating Desc':
    //     sort(arr[0].data.movies).asc(arr => arr.title)
    //     break;
    // }
    //   arr[0].data.movies = arr[0].data.movies.slice(0,50);
    //   res.json({ data: arr[0] });
    // }
  }
}

const getVideoByImdb = async (req, res, next) => {
  let data = await fetch(`https://yts.am/api/v2/list_movies.json?query_term=${req.params.imdb}`);
  data = await data.json();
  let omdb = await fetch(`http://www.omdbapi.com/?i=${req.params.imdb}&apikey=${keys.omdb.key}`);
  omdb = await omdb.json();
  data.data.movies[0].omdb = omdb;
  res.json({
    data: data.data.movies[0]
  });
}

module.exports = exports = {
  getVideoByPage,
  getVideoByImdb,
};