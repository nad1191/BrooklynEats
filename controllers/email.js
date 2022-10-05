const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/new', isLoggedIn, (req, res) => {
  db.author.findAll()
  .then((user) => {
    res.render('email/new', { restaurants: restaurants })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.post('/', isLoggedIn, (req, res) => {
    db.email.create({
        userId: DataTypes.INTEGER,
        restaurantId: DataTypes.INTEGER,
        message: DataTypes.TEXT, 
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })
  
  router.post('/:id/email',isLoggedIn, (req, res) => {
    const createdDate = new Date().toISOString();
    db.email.findOne({
      where: { id: req.params.id },
      include: [db.email, db.user]
    })
    .then((email) => {
      if (!email) throw Error()
      db.comment.create({
        message: req.body.content,
        userId: parseInt(req.params.id),
        restaurantId: parseInt(req.params.id),
        createdAt: createdDate,
        updatedAt: createdDate
      }).then(comment => {
        res.redirect(`/email/${req.params.id}`);
      })
    })
    .catch((error) => {
      console.log(error)
    })
  })

  
    
  
  module.exports = router;
  