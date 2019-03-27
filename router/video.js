const router = require("express").Router();
const { getVideoByPage, getVideoByImdb } = require("../controller/video");
const checkAuth = require("./check-auth");

router.get("", checkAuth, getVideoByPage);
router.get("/:imdb", checkAuth, getVideoByImdb);

module.exports = router;