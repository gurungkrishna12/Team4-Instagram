// const express = require('express');
// const mongoose = require('mongoose');
// const keys = require('./config/keys');

// const homePage = express();
// const login = require ('./routes/login');
// const post = require ('./routes/post');
// const profile = require ('./routes/profile');


// //first route
// homePage.get('/', (req, res) => res.send('Hello, its a beautiful day, I am loving it'));

// const db = keys.mogoURI;
// mongoose.connect(db)
// .then(() => console.log('Mongoose Connected'))
// .catch(err => console.log(err));

// //routes
// homePage.use('/routes/login', login);
// homePage.use('/routes/post', post);
// homePage.use('/routes/profile', profile);


// const port = 5000;
// homePage.listen(port, () => console.log(`Server is running on port ${port}`));

const express = require('express'); // common js modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/user');
require('./services/passport');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cookieSession({
    // 30 days
    maxAge: 30 * 24 * 60 *  60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000 // this tells us what port we to listen from Heroku and if it fells then we'll listen to 5000
app.listen(PORT);
