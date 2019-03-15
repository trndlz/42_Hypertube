const fetch = require('node-fetch');
var FFmpeg = require('fluent-ffmpeg');
var ffmpeg = require('ffmpeg-static');
var torrentStream = require('torrent-stream');
FFmpeg.setFfmpegPath(ffmpeg.path);

// var http = require("https");

const getRandomTorrent = async (req, res) => {
  // const movie = await fetch('https://tv-v2.api-fetch.website/random/movie');
  const movie = await fetch('https://tv-v2.api-fetch.website/movies/1');
  const json = await movie.json();
  const firstMovie = Object.values(json)[0];
  const firstMovieTorrent = Object.values(firstMovie)[9];
  const firstMovie1080p = Object.values(firstMovieTorrent)[0];
  const firstMovieUrl = Object.values(firstMovie1080p)[0];
  // const urls = json.torrents;
  console.log(firstMovieUrl.url);
  // const magnet = Object.values(urls.en)[0].url;
  // console.log(magnet);
  
  // var engine = torrentStream(magnet, { path: './' });
  // console.log(engine);

//   engine.on('ready', function() {
//     // console.log(engine.files);
//     engine.files.forEach(function(file) {
//         // console.log("ici", file.name)
//         console.log('filename:', file.name);
//         var stream = file.createReadStream();
//         // setTimeout(() => {
//           // console.log(stream)
//           var command = new FFmpeg({ source: stream })
//           .on('start', (commandLine) => {
//             // console.log('Spawned FFmpeg with command: ' + commandLine);
//           })
//           .on('codecData', (data) => {
//             //   console.log('Input is ' + data.audio + ' audio with ' + data.video + ' video');
//           })
//           .on('progress', (progress) => {
//             //   console.log('Processing: ' + progress.percent + '% done');
//           })
//           .on('error', (err) => {
//             //   console.log('Cannot process video: ' + err.message);
//           })
//           .on('end', () => {
//               console.log('Processing finished successfully');
//           })
//           .saveToFile('./output.mp4');
//           // engine.on('download', [stream])

//           // var magnet = 'magnet:?xt=urn:btih:' + data.args.hash;
//           // var engine = torrentStream(magnet,{path: '/films'});
  
//           // engine.on('ready', function() {
//           //     console.log('torrent dl ready:');
//           //     engine.files.forEach(function(file) {
//           //         if (file.name.substr(file.name.length - 3) == 'mkv' || file.name.substr(file.name.length - 3) == 'mp4') {
//           //             console.log('   Now streaming :', file.name);
//           //             var stream = file.createReadStream();
//           //             data.path = file.path;
//           //             fullfil(data);
//           //         }
//           //     });
//           // });
  
//           // engine.on('download', function(data) {
//           //     console.log('       piece downloaded :', data);
//           // });
  
//           // engine.on('idle', function() {
//           //     console.log('torrent end');
//           // });




//           // console.log(stream);
//           // console.log(command);
//         // }, 20000)
//       });
//   });

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
}

module.exports = exports = {
  getRandomTorrent
}