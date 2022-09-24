'use strict';
require('dotenv').config();
const axios = require('axios');
const yelp = require('yelp-fusion');
const APIKEY = process.env.APIKEY;
const client = yelp.client(APIKEY);

const searchRequest = {
  term:'restaurants',
  location: 'brooklyn, ny'
};
client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses;
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});

