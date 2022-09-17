const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios');
const yelp = require('yelp-fusion')
const APIKEY = process.env.APIKEY;

const searchRequest = {
    term:'restaurants',
    location: 'brooklyn, ny'
};

const client = yelp.client(APIKEY);

client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult. null,4);
    console.log(prettyJson);
}).catch(err => {
    console.log(err);
});


// router.get('/restaurants', async (req, res, next) => {
//     try{
//         const borough ='brooklyn';
//         const city ='new+york+city';
//         const catergory= 'restaurants';

//         const {data} = await axios.get(
//             `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${borough}+${city}&type=restaurant&key=${key}`
//         )
//         res.json(data);
//     }
//     catch(err){
//         next(err)
//     }
// })
module.exports = router;