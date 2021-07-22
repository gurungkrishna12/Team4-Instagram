const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const homePage = express();
const login = require ('./routes/login');
const post = require ('./routes/post');
const profile = require ('./routes/profile');


//first route
homePage.get('/', (req, res) => res.send('Hello, its a beautiful day, I am loving it'));

const db = keys.mogoURI;
mongoose.connect(db)
.then(() => console.log('Mongoose Connected'))
.catch(err => console.log(err));

//routes
homePage.use('/routes/login', login);
homePage.use('/routes/post', post);
homePage.use('/routes/profile', profile);


const port = 5000;
homePage.listen(port, () => console.log(`Server is running on port ${port}`));


