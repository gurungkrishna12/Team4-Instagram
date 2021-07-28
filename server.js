const express = require('express');
const mongoose  = require('mongoose');
const keys = require('./config/keys');
const homePage = express();
const login = require ('./routes/login');
const post = require ('./routes/post');
const profile = require ('./routes/profile');

//body parser config 
homePage.use(express.urlencoded())
homePage.use(express.json())

//database configuration 
const db = keys.mongoURI
mongoose
  .connect(db)
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log('Not connected', err))

//first route
homePage.get('/', (req, res) => res.send('Hello, its a beautiful day, I am loving it'));

//routes
homePage.use('/routes/login', login);
homePage.use('/routes/post', post);
homePage.use('/routes/profile', profile);

const port = 5100;
homePage.listen(port, () => console.log(`Server is running on port ${port}`));

