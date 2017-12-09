const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    //this is the route google uses after you authenticate with google
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );
  app.get('/api/logout', (req, res) => {
    req.logout(); //takes the cookie and kills the id with the cookie, you are no the user anymore.
    //res.send(req.user); // the response should be empty because their is no longer a user.
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
