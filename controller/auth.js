const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Model = require("../model/user");
const { emailSendVerification } = require("./nodemailer");
const {
    validateUsername,
    validateFirstName,
    validatePassword,
    validateLastName,
    validateEmail,
    checkUsername,
    checkEmail
} = require("../validation/validation");

const createJwtToken = payload => {
    return jwt.sign(payload, keys.jwt, { expiresIn: 3600 * 24 * 30 });
};

const googleAuth = (req, res) => {
    let token = createJwtToken({ _id: req.user._id, connectionType: req.user.connectionType, username: req.user.username, picture: req.user.picture });
    res.redirect(`http://localhost:3000/?token=${token}`);
};

const the42Auth = (req, res) => {
    let token = createJwtToken({ _id: req.user._id, connectionType: req.user.connectionType, username: req.user.username, picture: req.user.picture });
    res.redirect(`http://localhost:3000/?token=${token}`);
};

const localSignInAuth = async (req, res) => {
    const currentUser = await Model.User.findOne({
        username: req.body.username
    });
    if (!currentUser) {
        res.status(200).json({
            success: false,
            msg: "Wrong username or password"
        });
    } else {
        if (currentUser.connectionType !== "local") {
            res.status(200).json({
                success: false,
                msg: "This user is registered with OAuth"
            });
        } else if (!(await currentUser.isValidPassword(req.body.password))) {
            res.status(200).json({
                success: false,
                msg: "Wrong username or password"
            });
        } else {
            if (!currentUser.verified) {
                res.status(200).json({
                    success: false,
                    msg: "Please verify your email address"
                });
            } else {
                const payload = {_id: currentUser._id, connectionType: currentUser.connectionType, username: currentUser.username, picture: currentUser.picture };
                let token = createJwtToken(payload);
                res.status(200).json({
                    success: true,
                    token: token
                });
            }
        }
    }
};

const localSignUpAuth = async (req, res) => {
    let errors = {};
    if (!validateUsername(req.body.username)) errors.username = true;
    if (!(await checkUsername(req.body.username)))
        errors.duplicateUsername = true;
    if (!validateEmail(req.body.email)) errors.email = true;
    if (!(await checkEmail(req.body.email))) errors.duplicateEmail = true;
    if (!validateFirstName(req.body.firstName)) errors.firstName = true;
    if (!validateLastName(req.body.lastName)) errors.lastName = true;
    if (!validatePassword(req.body.password)) errors.password = true;
    if (!req.file) errors.picture = true;
    if (Object.keys(errors).length > 0) {
        res.json({ success: false, errors });
    } else {
        let currentUser = new Model.User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            picturePath: req.file.path,
            password: req.body.password,
            connectionType: "local"
        })
        currentUser.picture = `http://localhost:8145/auth/getlocalpicture/${currentUser._id}`
        currentUser.save()
        .then(() => {
            emailSendVerification(req, res);
        });
    }
};

module.exports = exports = {
    googleAuth,
    the42Auth,
    localSignUpAuth,
    localSignInAuth,
    createJwtToken
};
