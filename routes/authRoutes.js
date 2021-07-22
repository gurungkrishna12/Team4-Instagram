const passport = require('passport');

/// Route Handler
module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    /// this scope is not ramdomly created, but insted. Internally Google can only give as some especific information
    scope: ['profile', 'email']
   })
  );
  
  app.get('/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/accounts');
  });
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');

  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}
