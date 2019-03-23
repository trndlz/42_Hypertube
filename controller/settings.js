const {
    validateUsername,
    validateFirstName,
    validatePassword,
    validateLastName,
    validateEmail,
    checkUsername,
    checkEmail
} = require("../validation/validation");
const Model = require("../model/user");

const getSettings = async (req, res, next) => {
    const currentUser = await Model.User.findOne({
        _id: req.userData._id
    });
    res.json({
        picture: currentUser.picture,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        language: currentUser.language
    });
};

const postSettings = async (req, res, next) => {
    const currentUser = await Model.User.findOne({
        _id: req.userData._id
    });
    let errors = {};
    if (!validateUsername(req.body.username)) errors.username = true;
    if (
        !(await checkUsername(req.body.username)) &&
        currentUser.username !== req.body.username
    )
        errors.duplicateUsername = true;
    if (!validateEmail(req.body.email)) errors.email = true;
    if (
        !(await checkEmail(req.body.email)) &&
        currentUser.email !== req.body.email
    )
        errors.duplicateEmail = true;
    if (!validateFirstName(req.body.firstName)) errors.firstName = true;
    if (!validateLastName(req.body.lastName)) errors.lastName = true;
    if (currentUser.connectionType === 'local' && !validatePassword(req.body.password) && req.body.password !== "")
        errors.password = true;
    if (!req.file && req.body.pictureChanged === "true") {
        errors.picture = true;
    }
    if (Object.keys(errors).length > 0) {
        res.json({ success: false, errors });
    } else {
        currentUser.firstName = req.body.firstName;
        currentUser.lastName = req.body.lastName;
        currentUser.username = req.body.username;
        currentUser.email = req.body.email;
        currentUser.language = req.body.language;
        currentUser.picturePath = req.file ? req.file.path : currentUser.picturePath;
        currentUser.picture = req.file ? `http://localhost:8145/auth/getlocalpicture/${currentUser._id}` : currentUser.picture;
        currentUser.password = currentUser.connectionType === 'local' && req.body.password !== "" ? req.body.password : currentUser.password;
        currentUser.save();
        res.json({
            msg: "Settings Modified Successfully",
            success: true
        });
    }
};

module.exports = exports = {
    getSettings,
    postSettings
};
