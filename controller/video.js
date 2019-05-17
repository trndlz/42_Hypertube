const fetch = require('node-fetch');
const keys = require('../config/keys');
const path = require("path");
const Model = require("../model/user");
const mongoose = require("mongoose");

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
		movie.summary = movie.synopsis;
		delete movie.synopsis;
		return movie;
	})
}

const fetchIntlMovieDescriptions = async (imdbId, language) => {
	const res = await fetch(`https://api.themoviedb.org/3/find/${imdbId}?api_key=${keys.themoviedb.key}&language=${language}&external_source=imdb_id`);
	const resJson = await res.json();
	return resJson.movie_results[0];
}

const fetchMovies = (request) => {
	return new Promise(async (resolve, reject) => {
		try {
			let res = await fetch(request);
			res = await res.json();
			resolve(res)
		} catch (err) {
			reject(err);
		}
	});
}

const replace404Picture = async (data) => {
	let moviesImgUrl = [];
	if (data) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].large_cover_image && data[i].large_cover_image !== "images/posterholder.png") {
				moviesImgUrl.push(fetch(data[i].large_cover_image));
			} else {
				let res = await fetch(`https://yts.am/api/v2/list_movies.json?query_term=${data[i].imdb_code}`);
				res = await res.json();
				if (res.data.movies){ //! ICI
					data[i].large_cover_image = res.data.movies[0].large_cover_image
					data[i].year = res.data.movies[0].year
				}
			}
		}
		const imgData = await Promise.all(moviesImgUrl.map(p => p.catch(e => e)));
		imgData.forEach((img, index) => {
			if (img.status === 404) {
				data[index].large_cover_image = 'http://localhost:8145/video/logo'
			}
		});
	}
}

const getVideoByPage = async (req, res, next) => {
	let { category, sortBy, searchInput, page, stars } = req.query;
	category = category === "All Categories" ? "" : `&genre=${category}`;
	sortBy = sortBy || "download_count";
	page = page || "1";
	let order = ["year Asc", "title Desc", "download_count Asc", "rating Asc"].includes(sortBy) ? "desc" : "asc";
	sortBy = sortBy.split(' ')[0];
	let requestPopcorn;
	let requestYts;
	let data = [];
	if (searchInput !== '' && searchInput) {
		requestYts = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${page}&query_term=${searchInput}&order_by=${order}`;
		requestPopcorn = `https://tv-v2.api-fetch.website/movies/${page}?sort=${sortBy}&order=${order === 'desc' ? 1 : -1}&keywords=${searchInput}`;
		data = [fetchMovies(requestYts), fetchMovies(requestPopcorn)];
		data = await Promise.all(data).catch(e => res.status(500).send({ error: e }));
		rearangeData(data[1]);
		data = mergeArrays(data[0].data.movies, data[1]);
		data = removeDuplicates(data);
		await replace404Picture(data);
		if (mongoose.Types.ObjectId.isValid(req.userData._id)) {
			user = await Model.User.findOne({
				_id: req.userData._id
			});
			data = data.map((movie) => {
				if (user.moviesSeen.includes(movie.imdb_code)) {
					movie.isSeen = true;
				} else {
					movie.isSeen = false;
				}
				return movie
			})
		}
		res.json(data);
	} else {
		requestYts = `https://yts.am/api/v2/list_movies.json?sort_by=${sortBy}&limit=50&page=${page}&minimum_rating=${2 * stars - 2}${category}&order_by=${order}`;
		data = [fetchMovies(requestYts)];
		data = await Promise.all(data).catch(e => res.status(500).send({ error: e }));
		if (data){
			data = data[0].data.movies;
			await replace404Picture(data);
			if (mongoose.Types.ObjectId.isValid(req.userData._id)) {
				user = await Model.User.findOne({
					_id: req.userData._id
				});
				data = data.map((movie) => {
					if (user && user.moviesSeen.includes(movie.imdb_code)) {
						movie.isSeen = true;
					} else {
						movie.isSeen = false;
					}
					return movie
				})
			}
			res.json(data);
		}
	}
}

const getVideoByImdb = async (req, res, next) => {
	let requestPopcorn = `https://tv-v2.api-fetch.website/movie/${req.params.imdb}`;
	let requestYts = `https://yts.am/api/v2/list_movies.json?query_term=${req.params.imdb}`;
	let requestOmdb = `http://www.omdbapi.com/?i=${req.params.imdb}&apikey=${keys.omdb.key}`;
	let data = [fetch(requestYts), fetch(requestPopcorn), fetch(requestOmdb)];
	data = await Promise.all(data.map(p => p.catch(e => e)));
	data = data.map(movie => {
		try {
			return movie.json();
		} catch (err) {
			return null;
		}
	});
	data = await Promise.all(data.map(p => p.catch(e => e)));
	const omdb = data[2];
	let movie = await Model.Movie.findOne({
		imdbId: req.params.imdb
	});
	if (!data[0].data.movie_count) {
		rearangeData([data[1]]);
		data = [data[1]];
	} else if (data[1].type === "invalid-json") {
		data = data[0].data.movies;
	} else {
		data = mergeArrays(data[0].data.movies, [data[1]]);
		rearangeData([data[1]]);
		data = removeDuplicates(data);
	}
	if (!movie) {
		movie = await new Model.Movie({
			imdbId: req.params.imdb,
			title: data[0].title,
			isSaved: false
		})
			.save();
	}
	data[0].omdb = omdb;
	await replace404Picture(data);
	const languageDescriptions = await fetchIntlMovieDescriptions(req.params.imdb, req.params.lang);
	res.json({
		data: data[0],
		languageDescriptions: languageDescriptions,
	});
}

const getLogo = (req, res, next) => {
	res.sendFile(path.resolve("img/animal.svg"));
}

module.exports = exports = {
	getVideoByPage,
	getVideoByImdb,
	getLogo,
};