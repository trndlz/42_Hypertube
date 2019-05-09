const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const commentSchema = new Schema({
    comment: String,
    date: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }
});

const movieSchema = new Schema({
    imdbId: String,
    path: String,
    isSaved: Boolean,
    title: String,
});

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    picture: String,
    picturePath: String,
    password: String,
    language: {
        type: String,
        default: "en"
    },
    // moviesSeen: [movieSchema],//?
    moviesSeen: [String],
    authId: String,
    connectionType: String,
    token: String,
    verified: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    this.token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    next();
});

userSchema.methods.hashPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

userSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};

const User = mongoose.model("User", userSchema);
const Movie = mongoose.model("Movie", movieSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = exports = {
    User,
    Movie,
    Comment
};
