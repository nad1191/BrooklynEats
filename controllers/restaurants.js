const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios');
const yelp = require('yelp-fusion')
// const APIKEY = process.env.APIKEY;

router.get('/', async (req, res) => {
    let restaurant = await db.restaurants.findAll();
    restaurant = restaurant.map(r => r.toJSON());
    console.log(restaurant);
    res.render('restaurants/index', {restaurant:restaurant});
})

router.get('/search', (req,res) => {
  res.render('restaurants/search')
});

router.get('/:id',async (req,res) => {
  let restaurant = await db.restaurant.findOne({
    where: {id: req.params.id}
  });
  restaurant = restaurant.toJSON();
  console.log('======this is the show route=======');
  console.log(restaurant);
  res.render('restaurants/show', {restaurant:restaurant});
})

  

  
  
  
  

  
  module.exports = router;