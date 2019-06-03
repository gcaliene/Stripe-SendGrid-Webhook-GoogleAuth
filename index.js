require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
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

//Route handlers
require('./routes/authRoutes')(app); //require returns a function
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

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
