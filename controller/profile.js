const Model = require("../model/user");
const mongoose = require("mongoose");

const getProfile = async (req, res, next) => {
  let user;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    user = await Model.User.findOne({
      _id: req.params.id
    });
  }
  if (!user) {
    res.json({
      success: false,
      msg: "User doesn't exist"
    })
  } else {
    res.json({
      picture: user.picture,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      language: user.language,
      success: true,
    })
  }
}

const setVideoSeen = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.userData._id)) {
    user = await Model.User.findOne({
      _id: req.userData._id
    });
    if (!user.moviesSeen) {
      user.moviesSeen = [];
    }
    if (!user.moviesSeen.includes(req.body.imdbId)){
      user.moviesSeen = [...user.moviesSeen, req.body.imdbId];
      user.save();
    }
  }
}

module.exports = exports = {
    getProfile,
    setVideoSeen
};