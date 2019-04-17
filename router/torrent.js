const router = require("express").Router();
const streamTorrentByImdb = require("../controller/torrent").streamTorrentByImdb;

router.get("/:imdbId", streamTorrentByImdb);

module.exports = router;
