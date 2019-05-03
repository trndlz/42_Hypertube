const router = require("express").Router();
const passport = require("passport");
const {
    googleAuth,
    localSignInAuth,
    localSignUpAuth,
    githubAuth,
    facebookAuth,
    the42Auth
} = require("../controller/auth");
const checkAuth = require("./check-auth");
const Model = require("../model/user");
const path = require("path");
const { upload } = require("../config/multer");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/redirect", passport.authenticate("google"), googleAuth);

router.get("/github", passport.authenticate("github"));
router.get("/github/redirect", passport.authenticate("github"), githubAuth);

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/redirect", passport.authenticate("facebook"), facebookAuth);

router.get("/the42", passport.authenticate("42"));
router.get("/the42/redirect", passport.authenticate("42"), the42Auth);

router.post("/signup", upload.single("userPicture"), localSignUpAuth);
router.post("/signin", upload.none(), localSignInAuth);

router.get("/getlocalpicture/:id/:time", async (req, res, next) => {
    const currentUser = await Model.User.findOne({
        _id: req.params.id
    });
    res.sendFile(path.resolve(currentUser.picturePath));
});

router.get("/isauthenticated", checkAuth, (req, res, next) => {
    res.status(200).json({
        isAuthenticated: true
    });
});

module.exports = router;
