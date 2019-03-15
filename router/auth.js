const router = require("express").Router();
const passport = require("passport");
const {
    googleAuth,
    facebookAuth,
    localSignInAuth,
    localSignUpAuth
} = require("../controller/auth");


router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/redirect", passport.authenticate("google"), googleAuth);

router.get(
    "/facebook",
    passport.authenticate("facebook")
);

router.get(
    "/facebook/redirect",
    passport.authenticate("facebook"),
    facebookAuth
);

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

router.post("/signin", localSignInAuth);

module.exports = router;
