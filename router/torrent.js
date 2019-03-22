const router = require("express").Router();
const getRandomTorrent = require("../controller/torrent").getRandomTorrent;

router.get("/random", getRandomTorrent);

module.exports = router;
