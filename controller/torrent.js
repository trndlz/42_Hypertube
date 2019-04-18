const fetch = require("node-fetch");
const parseTorrent = require('parse-torrent');
var FFmpeg = require("fluent-ffmpeg");
var ffmpeg = require("ffmpeg-static");
var torrentStream = require("torrent-stream");
FFmpeg.setFfmpegPath(ffmpeg.path);
const fs = require('fs');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

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
	Object.keys(movieJson.torrents[defaultLanguage]).map(q => {
		b.push(parseInt(q.match(/\d+/)[0]));
	});
	const quality = `${highestQuality ? Math.max(...b) : Math.min(...b)}p`;
	const magnet = movieJson.torrents[defaultLanguage][quality].url;
	const engine = torrentStream(magnet);
	const range = req.headers.range;
	engine.on('ready', () => {
		engine.files.forEach((file) => {
			const total = file.length;
			const extension = file.name.split('.').pop();
			if (extension === 'mp4') {
				const positions = range.match(/\d+/g).map(Number);
				const start = positions[0] | 0;
				const end = total - 1;
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
