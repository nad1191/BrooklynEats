'use strict';
require('dotenv').config();
const axios = require('axios');
const yelp = require('yelp-fusion');
const APIKEY = process.env.APIKEY;
const HOST = process.env.HOST;

  const options = {
    method: 'GET',
    url: 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/NY/city/Brooklyn/0',
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

