const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('usersdb');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
});
 //accessToken is the code we get from google after the client has granted google to verify our request and passport has help us bring that code a a accessToken, with this token we can create a new user
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, 
async (accessToken, refreshToken, profile, done) => {
const existingUser = await User.findOne({googleId: profile.id})

    if(existingUser) {
      //We already have a record with given profile ID
    return  done(null, existingUser);
    } 
      // We don't have a user with this ID, make a new user record
    const user =  await new User({ googleId: profile.id }).save()
      done(null, user);
     console.log(profile);

})
); 