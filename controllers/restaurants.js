const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios');
require('dotenv').config();
const APIKEY = process.env.APIKEY;
const HOST = process.env.HOST;
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', async (req, res) => {
  let rest = await db.restaurant.findAll();
  rest = rest.map(r => r.toJSON()); 
  console.log(rest);
  res.render('restaurants/index', { rest: rest });
})

router.get('/search', (req, res) => {
  res.render('songs/search');
});

router.get('/results', async (req, res) => {
  console.log('>>>>> SEARCH DATA', req.body);
const options = {
  method: 'GET',
  url: 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/NY/city/Brooklyn',
  params: {q: req.body.search},
  headers: {
    'X-RapidAPI-Key': process.env.APIKEY,
    'X-RapidAPI-Host': process.env.HOST
  }
};
axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

});

router.get('/:id', async (req, res) => {
  let rests = await db.rests.findOne({
      where: { id: req.params.id }
  });
  rests = rests.toJSON();
  console.log('===== this is the show route =====');
  console.log(rests);
  res.render('restaurants/show', { rests: rests });
})

router.post('/new', async (req, res) => {
  console.log('****** /new', req.body);
  const newRest = await db.rests.create({
    userId: parseInt(req.body.userId),
    restaurantId: parseInt(req.body.restaurantId),
    restaurantName: req.body.restaurantName,
    address: parseInt(req.body.address),
    phone: parseInt(req.body.phone),
    cuisineType: req.body.cuisineType
  });

  console.log(newSong.toJSON());
  // res.redirect to all favorite songs
  res.redirect('/restaurants');
});




module.exports = router;