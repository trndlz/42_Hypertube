const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// const LocalStrategy = require("passport-local").Strategy;
const keys = require("./keys");
const Model = require("../model/user");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: keys.jwt
        },
        async (payload, done) => {
            try {
                const currentUser = await Model.User.findById(payload._id);
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    done(null, false);
                }
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebook.clientID,
            clientSecret: keys.facebook.clientSecret,
            callbackURL: "http://localhost:8145/auth/facebook/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const currentUser = await Model.User.findOne({
                    authId: profile.id
                });
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    new Model.User({
                        authId: profile.id,
                        username: profile.displayName,
                        password: "nopassword",
                        email: "noemail"
                        // picture: profile._json.image.url
                    })
                        .save()
                        .then(newUser => {
                            console.log("created new user: ", newUser);
                            done(null, newUser);
                        });
                }
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "http://localhost:8145/auth/google/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const currentUser = await Model.User.findOne({
                    authId: profile.id
                });
                if (currentUser) {
                    console.log("user is: ", currentUser);
                    done(null, currentUser);
                } else {
                    new Model.User({
                        authId: profile.id,
                        username: profile.displayName,
                        picture: profile._json.image.url
                    })
                        .save()
                        .then(newUser => {
                            console.log("created new user: ", newUser);
                            done(null, newUser);
                        });
                }
            } catch (err) {
                done(err);
            }
        }
    )
);

// passport.use(
//     "signup",
//     new LocalStrategy(
//         {
//             usernameFied: "username",

//         },
//         async (username, password, done) => {
//             try {
//                 // console.log(picture);
//                 const currentUser = await Model.User.create({ username, password });
//                 done(null, currentUser);
//             } catch (error) {
//                 done(error);
//             }
//         }
//     )
// );

// passport.use(
//     "signin",
//     new LocalStrategy(
//         async (username, password, done) => {
//             try {
//                 const currentUser = await Model.User.findOne({ username });
//                 if (!currentUser) {
//                     return done(null, false , { message: "User not found" });
//                 }
//                 const validate = await currentUser.isValidPassword(password);
//                 if (!validate) {
//                     done(null, false, { message: "Wrong Password" });
//                 } else {   
//                     done(null, currentUser, { message: "Logged in Successfully" });
//                 }
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );