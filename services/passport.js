const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // done is a callback to nudge passport along, user.id is the id assigned by mongo don't need user._id.$0id
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record with the given profile ID
          done(null, existingUser); //null indicates no error, we are done and second arg is the user, here ya go
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save() //save is to save to db
            .then(user => done(null, user));
        }
      });
    }
  )
);
