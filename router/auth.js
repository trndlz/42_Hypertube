const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
    googleAuth,
    facebookAuth,
    localSignInAuth,
    localSignUpAuth
} = require("../controller/auth");
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

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

router.post(
    "/signup",
    cors(corsOptions),
    passport.authenticate("signup", { session: false }),
    localSignUpAuth
);

router.post("/signin", cors(corsOptions), passport.authenticate("signin"), localSignInAuth);

// router.post("/signin", cors(corsOptions), async (req, res, next) => {
//     passport.authenticate("signin", async (err, user, info) => {
//         try {
//             if (err || !user) {
//                 const error = new Error("An Error occured");
//                 return next(error);
//             }
//             req.login(user, { session: false }, async error => {
//                 if (error) return next(error);
//                 const body = { _id: user._id, email: user.email };
//                 const token = jwt.sign({ user: body }, "top_secret");
//                 return res.status(200).json({ token });
//             });
//         } catch (error) {
//             return next(error);
//         }
//     })(req, res, next);
// });

module.exports = router;
