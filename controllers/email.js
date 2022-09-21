const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios');

router.post('/', (req, res) => {
    db.email.create({
        userId: DataTypes.INTEGER,
        restaurantId: DataTypes.INTEGER,
        message: DataTypes.TEXT,
        parentMessageId: DataTypes.INTEGER
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })
  
  router.get('/new', (req, res) => {
    db.author.findAll()
    .then((user) => {
      res.render('articles/new', { authors: authors })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })
  
  // GET /articles/:id - display a specific post and its author
  router.get('/:id', (req, res) => {
    db.article.findOne({
      where: { id: req.params.id },
      include: [db.author, db.comment]
    })
    .then((article) => {
      if (!article) throw Error()
      console.log(article.author)
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
  