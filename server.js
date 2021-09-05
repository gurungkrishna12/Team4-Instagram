const express = require('express');
const mongoose  = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const users = require ('./routes/login');
const post = require ('./routes/post');
const profile = require ('./routes/profile');

//testing
const homePage = express();

//body parser config
//middlewares

homePage.use(express.urlencoded());
homePage.use(express.json());

//database configuration 
const db = keys.mongoURI;
console.log(db);
mongoose.connect(db)
.then(() => console.log('It is connected!'))
.catch(() => console.log('Not Connected'));

//Passport config 
homePage.use(passport.initialize());
require('.../../config/passport')(passport);

//Passport config 
homePage.use(passport.initialize());
require('./config/passport')(passport);

//first route
homePage.get('/', (req, res) => res.send('Hello, its a beautiful day, I am loving it'));

//routes
homePage.use('/api/users', users);
homePage.use('/api/posts', post);
homePage.use('/api/profile', profile);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));