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

module.exports = exports = {
    getProfile,
};