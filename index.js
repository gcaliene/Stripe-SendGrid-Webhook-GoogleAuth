const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// const passportConfig = require('./services/passport');
require('./models/User'); //this needs to run before passport because it is not defined in passport
require('./services/passport'); //this needs to have the models defined so it comes after the models

// const authRoutes = require('./routes/authRoutes'); //instead of using this we straight up use the

// mongoose.connect(keys.mongoURI); //gives deprecation warning
mongoose.connection.openUri(keys.mongoURI);

const app = express();
//express middlewares are wired to express by the app.use call

app.use(bodyParser.json()); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); //require returns a function
require('./routes/billingRoutes')(app);

//when in production the following code is ran, i.e. if in Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  //catchAll if it is not in the main.js or main.css files below
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// //GET route handler\\\\
// app.get('/', (req, res) => {
//   res.send({ hi: 'there, Gerson' });
// });

