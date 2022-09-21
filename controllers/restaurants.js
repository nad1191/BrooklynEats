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


router.get('/restaurants', async (req, res, next) => {
    try{
        const borough ='brooklyn';
        const city ='new+york+city';
        const catergory= 'restaurants';

        const {data} = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${borough}+${city}&type=restaurant&key=${key}`
        )
        res.json(data);
    }
    catch(err){
        next(err)
    }
})

  
  router.get('/show', (req, res) => {
    db.restaurant.findAll()
    .then((restaurants) => {
      res.render('restaurants/show')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })
  
  
  router.get('/:id', (req, res) => {
    db.restaurant.findOne({
      where: { id: req.params.id },
      include: [db.comment]
    })
    .then((restaurant) => {
      if (!restaurant) throw Error()
      console.log(restaurant)
      res.render('articles/show', { article: article })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })
  
  router.post('/:id/comment', (req, res) => {
    const createdDate = new Date().toISOString();
    db.article.findOne({
      where: { id: req.params.id },
      include: [db.author, db.comment]
    })
    .then((article) => {
      if (!article) throw Error()
      db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleId: parseInt(req.params.id),
        createdAt: createdDate,
        updatedAt: createdDate
      }).then(comment => {
        res.redirect(`/articles/${req.params.id}`);
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })
    
  
  module.exports = router
  
module.exports = router;