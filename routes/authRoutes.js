const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
  app.get('/api/logout', (req, res) => {
    req.logout(); //takes the cookie and kills the id with the cookie, you are no the user anymore.
    res.send(req.user); // the response should be empty because their is no longer a user.
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
