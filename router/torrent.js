const router = require("express").Router();
const streamTorrentByHash = require("../controller/torrent").streamTorrentByHash;

router.get("/:hash", streamTorrentByHash);

module.exports = router;
