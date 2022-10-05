const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios');
require('dotenv').config();
const APIKEY = process.env.APIKEY;
const HOST = process.env.HOST;
const isLoggedIn = require('../middleware/isLoggedIn');

app.delete('/auth/:id', isLoggedIn, async (req, res) => {
    try{
    let deleteProfile = await db.auth.destroy({
      where:{id: req.params.id}
    })
    res.redirect('/profile')
    } catch(error){
      console.log(`error!!!!!!!!!`);
      console.log(error);
      res.render('/profile');
    }
  })

  module.exports = router;