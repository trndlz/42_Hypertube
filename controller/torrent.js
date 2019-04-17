const fetch = require("node-fetch");
const parseTorrent = require('parse-torrent');
var FFmpeg = require("fluent-ffmpeg");
var ffmpeg = require("ffmpeg-static");
var torrentStream = require("torrent-stream");
FFmpeg.setFfmpegPath(ffmpeg.path);
const fs = require('fs');

// var http = require("https");

const getRandomTorrent = async (req, res) => {
    // const movie = await fetch('https://tv-v2.api-fetch.website/random/movie');
    // const movie = await fetch("https://tv-v2.api-fetch.website/movies/1");
    // const json = await movie.json();
    // const firstMovie = Object.values(json)[0];
    // const firstMovieTorrent = Object.values(firstMovie)[9];
    // const firstMovie1080p = Object.values(firstMovieTorrent)[0];
    // const firstMovieUrl = Object.values(firstMovie1080p)[0];
    // const urls = json.torrents;
    // console.log(firstMovieUrl.url);
    // const magnet = Object.values(urls.en)[0].url;
	// console.log(magnet);
	
	const a = "magnet:?xt=urn:btih:D9D9785105166A3A93DA6E1F09BD062142A2E2F4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337";
	const legitMagnet = "magnet:?xt=urn:btih:8652044ace2ba702d02c1811acfe98b367ebf24e&dn=Pbtestfilemp4videotestmp4";
	const otherLegitMagnet = "magnet:?xt=urn:btih:RQ7SHVALEK2D3IKIYQM5N2D2YYWJYKTX&dn=tjdeebok&tr=http%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce";


	// console.log(legitMagnet)

    var engine = torrentStream(otherLegitMagnet, { path: './' });
	console.log(engine.files);
	
	// const test = parseTorrent(fs.readFileSync(__dirname + '/tjdeebok_archive.torrent')).toMagnetURI()
	// console.log(test);

      engine.on('ready', function() {
        console.log(engine);
        engine.files.forEach(function(file) {
            // console.log("ici", file.name)
            console.log('filename:', file.name);
            var stream = file.createReadStream();
            // setTimeout(() => {
              // console.log(stream)
              var command = new FFmpeg({ source: stream })
              .on('start', (commandLine) => {
                console.log('Spawned FFmpeg with command: ' + commandLine);
              })
              .on('codecData', (data) => {
                  console.log('Input is ' + data.audio + ' audio with ' + data.video + ' video');
              })
              .on('progress', (progress) => {
                  console.log('Processing: ' + progress.percent + '% done');
              })
              .on('error', (err) => {
                  console.log('Cannot process video: ' + err.message);
              })
              .on('end', () => {
                  console.log('Processing finished successfully');
              })
            //   .saveToFile('./output.mp4');
              // engine.on('download', [stream])

              // var magnet = 'magnet:?xt=urn:btih:' + data.args.hash;
              // var engine = torrentStream(magnet,{path: '/films'});

              // engine.on('ready', function() {
              //     console.log('torrent dl ready:');
              //     engine.files.forEach(function(file) {
              //         if (file.name.substr(file.name.length - 3) == 'mkv' || file.name.substr(file.name.length - 3) == 'mp4') {
              //             console.log('   Now streaming :', file.name);
              //             var stream = file.createReadStream();
              //             data.path = file.path;
              //             fullfil(data);
              //         }
              //     });
              // });

              // engine.on('download', function(data) {
              //     console.log('       piece downloaded :', data);
              // });

              // engine.on('idle', function() {
              //     console.log('torrent end');
              // });

              // console.log(stream);
              // console.log(command);
            // }, 20000)
          });
      });

    // //   var options = {
    // //     "method": "GET",
    // //     "hostname": "tv-v2.api-fetch.website",
    // //     "port": null,
    // //     "path": "/random/movie",
    // //     "headers": {}
    // //   };

    // //   var req = http.request(options, function (res) {
    // //     var chunks = [];

    // //     res.on("data", function (chunk) {
    // //       chunks.push(chunk);
    // //     });

    // //     res.on("end", function () {
    // //       var body = Buffer.concat(chunks);
    // //       console.log(body.toString());
    // //     });
    // //   });

    // //   req.write("{}");
    // //   req.end();
};

module.exports = exports = {
    getRandomTorrent
};
