const router = require("express").Router();
const streamTorrentByHash = require("../controller/torrent").streamTorrentByHash;
const fetchSubtitlesByImdbId = require("../controller/torrent").fetchSubtitlesByImdbId;

router.get("/:hash", streamTorrentByHash);
router.get("/subtitles/:imdbId", fetchSubtitlesByImdbId);

module.exports = router;
