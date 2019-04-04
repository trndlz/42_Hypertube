const router = require("express").Router();
const { postComment, getUserComments, getMovieComments } = require("../controller/comments");
const checkAuth = require("./check-auth");

router.post("/", checkAuth, postComment);
router.get("/user/:userId", checkAuth, getUserComments);
router.get("/movie/:movieId", checkAuth, getMovieComments);

module.exports = router;