const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FortyTwoStrategy = require("passport-42").Strategy;
const GithubStrategy = require("passport-github").Strategy;
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
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "http://localhost:8145/auth/google/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const currentUser = await Model.User.findOne({
                    authId: profile.id,
                    connectionType: "google"
                });
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    new Model.User({
                        authId: profile.id,
                        username: profile.displayName.replace(/\s/g,''),
                        picture: profile._json.image.url,
                        firstName: profile.name.givenName.replace(/\s/g,''),
                        lastName: profile.name.familyName.replace(/\s/g,''),
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
    new GithubStrategy(
        {
            clientID: keys.github.clientID,
            clientSecret: keys.github.clientSecret,
            callbackURL: "http://localhost:8145/auth/github/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const currentUser = await Model.User.findOne({
                    authId: profile.id,
                    connectionType: "github"
                });
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    console.log(profile)
                    new Model.User({
                        authId: profile.id,
                        username: profile.username.replace(/\s/g,''),
                        picture: profile._json.avatar_url,
                        firstName: profile.username.slice(0, profile.username.length - 1).replace(/\s/g,''),
                        lastName: profile.username.slice(profile.username.length - 1, profile.username.length).replace(/\s/g,''),
                        connectionType: "github",
                        verified: true,
                        email: profile._json.email
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
                    authId: profile.id,
                    connectionType: "the42"
                });
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    new Model.User({
                        authId: profile.id,
                        username: profile.username.replace(/\s+/g,''),
                        picture: profile.photos[0].value,
                        firstName: profile.name.givenName.replace(/\s/g,''),
                        lastName: profile.name.familyName.replace(/\s/g,''),
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
