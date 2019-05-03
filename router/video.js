const router = require("express").Router();
const { getVideoByPage, getVideoByImdb, getLogo } = require("../controller/video");
const checkAuth = require("./check-auth");

router.get("", checkAuth, getVideoByPage);
router.get("/logo", getLogo);
router.get("/:imdb/:lang", checkAuth, getVideoByImdb);

module.exports = router;