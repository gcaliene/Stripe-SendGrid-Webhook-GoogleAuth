const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.goggleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('====================================');
      console.log('access token', accessToken);
      console.log('+++++++++++++++++++++++++++');
      console.log('refresh token', refreshToken);
      console.log('+++++++++++++++++++++++++++');
      console.log('profile:', profile);
      console.log('====================================');
    }
  )
);
