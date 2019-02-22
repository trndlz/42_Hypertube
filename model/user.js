const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const commentSchema = new Schema({
    comment: String,
    date: String,
})

const movieSchema = new Schema({ 
    title:String,
    date:String,
    stars:String,
    desc:String,
    team:String,
    comments:[commentSchema],
});

const userSchema = new Schema({ 
    firstName: String,
    lastName: String,
    username:String,
    email:{
        type: String,
        // required: true,
        // unique: true
    },
    picture:String,
    password:{
        type: String,
        // required: true
    },
    language: String,
    moviesSeen:[movieSchema],
    comments:[commentSchema],
    authId: String,
    connectionType: String
});

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
}

const User = mongoose.model('User', userSchema);
const Movie = mongoose.model('Movie', movieSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = exports = {
    User,
    Movie,
    Comment
}