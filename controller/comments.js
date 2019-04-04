const Model = require("../model/user");
const { validateComment } = require("../validation/validation");

const postComment = async (req, res) => {
    let comment = req.body.commentText.trim();
    if (validateComment(comment)) {
        let movie = await Model.Movie.findOne({
            imdbId: req.body.imdbId
        });
        if (movie) {
            let comment = await new Model.Comment({
                comment: req.body.commentText,
                date: Date.now(),
                userId: req.userData._id,
                movieId: movie._id
            })
            .save();
            res.json({ success: true, msg: "Comment posted successfully", comment });
        } else {
            res.json({ success: false, msg: "This movie doesn't exists" });
        }
    } else {
        res.json({ success: false, msg: "Comment too long or too short" }); 
    }
}

const getMovieComments = async (req, res) => {
    let movie = await Model.Movie.findOne({
        imdbId: req.params.movieId
    });
    if (movie) {
        let comments = await Model.Comment.find({
            movieId: movie._id
        })
        .sort({date: 'asc'})
        .lean();
        comments = comments.map(async comment => {
            let user = await Model.User.findOne({
                _id: comment.userId
            })
            comment.userId = user._id;
            comment.username = user.username;
            comment.userPicture = user.picture;
            return comment;
        })
        comments = await Promise.all(comments);
        res.json({ comments })
    } else {
        res.json({msg: "No comments"})
    }
}

const getUserComments = async (req, res) => {
    let user = await Model.User.findOne({
        _id: req.params.userId
    })
    let comments = await Model.Comment.find({
        userId: user._id
    })
    .lean();
    comments = comments.map(async comment => {
        let movie = await Model.Movie.findOne({
            _id: comment.movieId
        })
        comment.movie = movie.title;
        return comment;
    })
    comments = await Promise.all(comments);
    res.json({ comments })
}

module.exports = exports = {
    postComment,
    getMovieComments,
    getUserComments
};