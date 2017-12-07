//keys.js which credentials to return

if (process.env.NODE_ENV === 'production') {
  //we are in production so return the prod set of keys
} else {
  //we are in development -- return the dev keys
  module.exports = require('./dev');
}
