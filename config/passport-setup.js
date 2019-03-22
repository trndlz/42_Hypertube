const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FortyTwoStrategy = require("passport-42").Strategy;
const keys = require("./keys");
const Model = require("../model/user");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
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
                    done(null, currentUser);
                } else {
                    new Model.User({
                        authId: profile.id,
                        username: profile.displayName,
                        picture: profile._json.image.url,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        connectionType: "google",
                        verified: true,
                        email: profile.emails[0].value
                    })
                        .save()
                        .then(newUser => {
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
    new FortyTwoStrategy(
        {
            clientID: keys.the42.clientID,
            clientSecret: keys.the42.clientSecret,
            callbackURL: "http://localhost:8145/auth/the42/redirect"
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
                        username: profile.username,
                        picture: profile.photos[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        connectionType: "the42",
                        verified: true,
                        email: profile.emails[0].value
                    })
                        .save()
                        .then(newUser => {
                            done(null, newUser);
                        });
                }
            } catch (err) {
                done(err);
            }
        }
    )
);
