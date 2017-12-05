const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

// //GET route handler\\\\
// app.get('/', (req, res) => {
//   res.send({ hi: 'there, Gerson' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
