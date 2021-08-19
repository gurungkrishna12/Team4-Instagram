const express = require('express');
const mongoose  = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const homePage = express();
const users = require ('./routes/login');
const post = require ('./routes/post');
const profile = require ('./routes/profile');




//body parser config 

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
homePage.use('/routes/users', users);
homePage.use('/routes/post', post);
homePage.use('/routes/profile', profile);

const port = 5000;
homePage.listen(port, () => console.log(`Server is running on port ${port}`));

// //routes
// homePage.use('/routes/login', login);
// homePage.use('/routes/post', post);
// homePage.use('/routes/profile', profile);


// const port = 5000;
// homePage.listen(port, () => console.log(`Server is running on port ${port}`));

// const express = require('express'); // common js modules
// const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
// require('./models/user');
// require('./services/passport');
// const keys = require('./config/keys');


// mongoose.connect(keys.mongoURI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// const app = express();

// app.use(
//   cookieSession({
//     // 30 days
//     maxAge: 30 * 24 * 60 *  60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// require('./routes/authRoutes')(app);

// const PORT = process.env.PORT || 5000 // this tells us what port we to listen from Heroku and if it fells then we'll listen to 5000
// app.listen(PORT);
