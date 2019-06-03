const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CoinbaseStrategy = require('passport-coinbase').Strategy;
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
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //we already have a record with the given profile ID
        return done(null, existingUser); //null indicates no error, we are done and second arg is the user, here ya go
      } //else {
      //else wont be needed if return is added to the previous if statement
      // we don't have a user record with this ID, make a new record
      const user = await new User({ googleId: profile.id }).save(); //save is to save to db, remember anytime we touch our database that is our asynchronous action
      done(null, user);
    }
  )
);

passport.use(new CoinbaseStrategy({
  clientID: process.env.COINBASE_CLIENT_ID,
  clientSecret: process.env.COINBASE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/coinbase/callback"
},
function(accessToken, refreshToken, profile, done) {
  // ...
}
));
