const fetch = require("node-fetch");
const fs = require("fs");
const parseTorrent = require('parse-torrent');
var FFmpeg = require("fluent-ffmpeg");
var ffmpeg = require("ffmpeg-static");
var torrentStream = require("torrent-stream");
const readline = require('readline');
FFmpeg.setFfmpegPath(ffmpeg.path);
const yifysubtitles = require('yifysubtitles');
path = require('path');

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

const fetchSubtitlesByImdbId = async (req, res) => {
	const imdbId = req.params.imdbId;
	yifysubtitles(imdbId, { path: __dirname + '/../client/public/subtitles', langs: ['en', 'fr', 'es'] })
		.then(data => res.json(data))
		.catch(err => console.log(err));
}

const writeResHeader = (req, res, file) => {
	const total = file.length;
	const range = req.headers.range;
	const positions = range.match(/\d+/g).map(Number);
	const start = positions[0] | 0;
	const end = total - 1;
	const chunksize = (end - start) + 1;
	res.writeHead(206, {
		"Content-Range": "bytes " + start + "-" + end + "/" + total,
		"Accept-Ranges": "bytes",
		"Content-Length": chunksize,
		"Content-Type": "video/mp4",
		'Connection': 'keep-alive'
	});
	return {
		"start": start,
		"end": end,
	}
}

const streamTorrentByHash = async (req, res) => {

	const hash = req.params.hash;
	const path = __dirname + '/../downloads';
	const magnet = `magnet:?xt=urn:btih:${hash}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`;
	const engine = torrentStream(magnet, {
		path: path,
	});

	engine.on('ready', () => {
		engine.files.forEach((file) => {
			const extension = file.name.split('.').pop();
			if (extension === 'mp4') {
				console.log("> Currently streaming", file.name, formatBytes(file.length));
				file.createReadStream(writeResHeader(req, res, file)).pipe(res);
			} else if (extension === 'mkv') {
				const stream = fs.createReadStream(path + '/' + file.path);
				res.writeHead(200, {
					"Content-Type": "video/mp4",
					'Connection': 'keep-alive'
				});
				var proc = FFmpeg(stream)
					.outputOptions(['-frag_duration 100', '-movflags frag_keyframe+empty_moov+faststart'])
					.toFormat('mp4')
					.videoCodec('libx264')
					// .videoBitrate('2048')
					.audioCodec('aac')
					// .audioBitrate('256')
					.on('error', function (err, stdout, stderr) {
						console.log('an error happened: ' + err.message);
						console.log('ffmpeg stdout: ' + stdout);
						console.log('ffmpeg stderr: ' + stderr);
					})
					.on('start', (commandLine) => {
						console.log('Spawned FFmpeg with command: ' + commandLine);
					})
					.on('codecData', (data) => {
						console.log('Input is ' + data.audio + ' audio with ' + data.video + ' video');
					})
					.on('end', () => {
						console.log('Processing finished successfully');
					})
					.pipe(res);
					res.on('close', () => {
						stream.destroy()
					  })

			} else {
				file.deselect();
			}
		});
	});
	engine.on('download', () => {
		progressionPrint(formatBytes(engine.swarm.downloaded));
	});
	engine.on('idle', function () {
		console.log('Torrent downloaded');
	});

};

module.exports = exports = {
	streamTorrentByHash,
	fetchSubtitlesByImdbId,
};
