require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios= require('axios');
const yelp = require('yelp-fusion')
const db = require('./models')

const OMBDKEY = process.env.OMBDKEY;
const APIKEY = process.env.APIKEY;



// console.log('yoooooooooooo',OMBDKEY);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: OMBDKEY,
  resave: false,
  saveUninitialized: true

}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
  console.log('res locals >>> ', res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

//access to all of our auth routes /auth/login, GET /auth/signup POST routes
app.use('/auth', require('./controllers/auth'));
app.use('/restaurants', require('./controllers/restaurants'));

// Add this above /auth controllers


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
