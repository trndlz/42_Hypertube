const router = require("express").Router();
const { getVideoByPage, getVideoByImdb } = require("../controller/video");
const checkAuth = require("./check-auth");

router.get("/:page", checkAuth, getVideoByPage);
router.get("/movie/:imdb", checkAuth, getVideoByImdb);

module.exports = router;