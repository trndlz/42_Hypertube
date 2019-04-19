const fetch = require("node-fetch");
const parseTorrent = require('parse-torrent');
var FFmpeg = require("fluent-ffmpeg");
var ffmpeg = require("ffmpeg-static");
var torrentStream = require("torrent-stream");
const readline = require('readline');
FFmpeg.setFfmpegPath(ffmpeg.path);

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function progressionPrint(downloaded) {
	readline.cursorTo(process.stdout, 0);
	process.stdout.write(downloaded);
}

const streamTorrentByHash = async (req, res) => {

	const hash = req.params.hash;
	const magnet = `magnet:?xt=urn:btih:${hash}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`;
	const engine = torrentStream(magnet, {
		path: __dirname + '/download'
	});
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
				console.log("________ > Started stream of " + file.name);
				console.log("________ > Movie size " + formatBytes(file.length));
				file.createReadStream({
					"start": start,
					"end": end,
				}).pipe(res);
			}
		});
	});
	engine.on('download', (index) => {
		progressionPrint(formatBytes(engine.swarm.downloaded));
	});
	engine.on('idle', function () {
		console.log('Torrent downloaded');
	});

};

module.exports = exports = {
	streamTorrentByHash
};
