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
  let restaurants = await db.restaurant.findAll();
  restaurants = restaurants.map(r => r.toJSON()); 
  console.log(restaurants); 
  res.render('restaurants/index', { restaurants: restaurants });
})

router.get('/results', (req, res) => {
  res.render('restaurants/results');
});

router.get('/:id', async (req, res) => {
  let rest = await db.rest.findOne({
      where: { id: req.params.id }
  });
  rest = rest.toJSON();
  console.log('===== this is the show route =====');
  console.log(song);
  res.render('restaurants/show', { rest: rest });
})

router.post('/new', async (req, res) => {
  console.log('****** /new', req.body);
  // create song (for db)
  const newRest= await db.restaurant.create({
      restaurantName: req.body.restaurantName,
      address: parseInt(req.body.address),
      phone: parseInt(req.body.phone),
      cuisineType: req.body.cuisineType,
      userId: parseInt(req.body.userId),
      restaurantId: parseInt(req.body.restaurantId),
      url: req.body.url
  });
  console.log(newRest.toJSON());
  res.redirect('/restaurants');
});


router.post('/results', isLoggedIn, async (req,res) => {
  const axios = require("axios");

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
	console.log(response.data.response.rest);
}).catch(function (error) {
	console.error(error);
});

})









  

  
module.exports = router;