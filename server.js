const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const login = require ('./routes/login');
const post = require ('./routes/post');
const profile = require ('./routes/profile');
const homePage = express();



//body parser config 

homePage.use(express.urlencoded());
homePage.use(express.json());

//database configuration 
const db = keys.mongoURI;
console.log(db);
mongoose.connect(db)
.then(() => console.log('Connected!'))
.catch(() => console.log('Not Connected'));

//Passport config 
homePage.use(passport.initialize());
require('.../../config/passport')(passport);

//first route
homePage.get('/', (req, res) => res.send('Hello, its a beautiful day, I am loving it'));


// //routes
homePage.use('/routes/users', login);
homePage.use('/routes/post', post);
homePage.use('/routes/profile', profile);

const port = 5100;
homePage.listen(port, () => console.log(`server is running in ${port}`));


