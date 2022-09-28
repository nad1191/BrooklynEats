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
    let restaurant = await db.restaurant.findAll();
    restaurant = restaurant.map(r => r.toJSON());
    console.log(restaurant);
    res.render('restaurants/index', {restaurant: restaurant});
})



router.get('/:id',async (req,res) => {
  let restaurant = await db.restaurant.findone({
    where: {id: req.params.id},
    include: [db.comment]
  });
  restaurant = restaurant.toJSON();
  console.log('======this is the show route=======');
  console.log(restaurant);
  res.render('restaurants/results', {restaurant:restaurant});
})



router.post('/results', isLoggedIn, async (req,res) => {
  const options = {
    method: 'GET',
    url: 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/NY/city/Brooklyn',
    params: {q:req.body.search},
    headers: {
      'X-RapidAPI-Key': process.env.APIKEY,
      'X-RapidAPI-Host': process.env.HOST
    }
  };
  
  const response = await axios.request(options);
    console.log(response.data.response.restaurant);
    res.render('restaurants/results', {restaurant:response.data.response.restaurant })
})










  

  
module.exports = router;