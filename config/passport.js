const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FaceBookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");

const passport = require("passport");

//// google ///////
passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.app_server + "/users/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async function (accessToken, refreshToken, profile, done) {
      const existsUser = await User.findOne({ googleId: profile.id });
      if (!existsUser) {
        const existsEmail = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existsEmail) {
          done(null, false);
        } else {
          const newUser = await new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            googleId: profile.id,
          }).save();
          done(null, newUser);
        }
      } else {
        done(null, existsUser);
      }
    }
  )
);

/////////////////  GitHub   /////////
passport.use(
  new GitHubStrategy(
    {
      callbackURL: process.env.app_server + "/users/github/callback",
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: ["user:email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const existsUser = await User.findOne({ githubId: profile.id });
      if (!existsUser) {
        const existsEmail = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existsEmail) {
          done(null, false);
        } else {
          const newUser = await new User({
            username: profile.username,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            githubId: profile.id,
          }).save();
          done(null, newUser);
        }
      } else {
        done(null, existsUser);
      }
    }
  )
);

///////  facebook    //////
passport.use(
  new FaceBookStrategy(
    {
      callbackURL: process.env.app_server + "/users/facebook/callback",
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const existsUser = await User.findOne({ facebookId: profile.id });
      if (!existsUser) {
        const existsEmail = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existsEmail) {
          done(null, false);
        } else {
          const newUser = await new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            facebookId: profile.id,
          }).save();
          done(null, newUser);
        }
      } else {
        done(null, existsUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
