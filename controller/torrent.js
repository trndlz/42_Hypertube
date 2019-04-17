const fetch = require("node-fetch");
const parseTorrent = require('parse-torrent');
var FFmpeg = require("fluent-ffmpeg");
var ffmpeg = require("ffmpeg-static");
var torrentStream = require("torrent-stream");
FFmpeg.setFfmpegPath(ffmpeg.path);
const fs = require('fs');

const streamTorrentByImdb = async (req, res) => {

	const imdbId = req.params.imdbId;
	const movie = await fetch(`https://tv-v2.api-fetch.website/movie/${imdbId}`);
	const movieJson = await movie.json();
	const highestQuality = 0;
	const defaultLanguage = 'en';

	if (!Object.keys(movieJson.torrents).includes(defaultLanguage)) {
		return res.status(400).send('Unavailable language');
	}

	let b = [];
	Object.keys(movieJson.torrents[language]).map(q => {
		b.push(parseInt(q.match(/\d+/)[0]));
	});
	const quality = `${highestQuality ? Math.max(...b) : Math.min(...b)}p`;
	const magnet = movieJson.torrents[language][quality].url;
	const engine = torrentStream(magnet);
	const range = req.headers.range;
	if (!range) {
		return res.sendStatus(416);
	}
	engine.on('ready', () => {
		engine.files.forEach((file) => {
			const extension = file.name.split('.').pop();
			if (extension === 'mp4') {
				const positions = range.replace(/bytes=/, "").split("-");
				const start = parseInt(positions[0], 10);
				const total = file.length;
				const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
				const chunksize = (end - start) + 1;
				res.writeHead(206, {
					"Content-Range": "bytes " + start + "-" + end + "/" + total,
					"Accept-Ranges": "bytes",
					"Content-Length": chunksize,
					"Content-Type": "video/mp4"
				});
				file.createReadStream({
					"start": start,
					"end": end,
				}).pipe(res);
			}
		});
	});
};

module.exports = exports = {
	streamTorrentByImdb
};
