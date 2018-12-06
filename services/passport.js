const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// Serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialization
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log(user, id);
    done(null, user);
  });
});

// Verification and Creation of GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            image: profile._json.image.url,
            email: profile._json.emails[0].value,
            first_name: profile._json.name.givenName,
            last_name: profile._json.name.familyName
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "last_name",
        "middle_name",
        "link",
        "photos"
      ]
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({
            facebookId: profile.id,
            name: profile.displayName,
            image: profile._json.picture.data.url,
            email: profile._json.email,
            first_name: profile._json.name.givenName,
            last_name: profile._json.name.familyName
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
