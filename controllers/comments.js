const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios');
require('dotenv').config();
const APIKEY = process.env.APIKEY;
const HOST = process.env.HOST;
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/new', (req, res) => {
  db.restaurant.findAll()
  .then((article) => {
    res.render('comments/new', { restaurant: restaurant })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.get('/:id', (req, res) => {
  db.comments.findOne({
    where: { id: req.params.id },
    include: [db.restaurant]
  })
  .then((comment) => {
    if (!comment) throw Error()
    console.log(comment.restaurant)
    res.render('comments/show', { comment: comment })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

router.post('/', (req, res) => {
  db.comments.create({
    comment: DataTypes.TEXT,
    review: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.delete('/:id', async (req, res) => {

  let commentDeleted = await db.comment.destroy({
      where: { id: req.params.id }
  });
  console.log('==== this is the delete route ======');
  console.log('Amount of songs deleted', commentDeleted);
  res.redirect('/restaurants');
});



module.exports = router;