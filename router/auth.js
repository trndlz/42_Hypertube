const router = require("express").Router();
const passport = require("passport");
const { googleAuth, localSignInAuth, localSignUpAuth, the42Auth } = require("../controller/auth");
const checkAuth = require('./check-auth')

router.get('/isauthenticated', checkAuth, (req, res, next) => {
    res.status(200).json({
        isAuthenticated: true
    });
})

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/redirect", passport.authenticate("google"), googleAuth);

router.get("/the42", passport.authenticate("42"));
router.get("/the42/redirect", passport.authenticate("42"), the42Auth);

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.match(/.*\/(.*)/)[1])
    }
  })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.post(
    "/signup",
    upload.single("userPicture"),
    localSignUpAuth
);

router.post(
    "/signin",
    upload.none(),
    localSignInAuth
);

module.exports = router;
