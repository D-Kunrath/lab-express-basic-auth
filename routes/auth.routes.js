const express = require('express');
const { get } = require('mongoose');
const { render } = require('../app');

const userRouter = express.Router();

const User = require('../models/User.model')

const bcrypt = require('bcryptjs');
const saltRounds = 10;
// const pwHash = require('../functional/auth.call')

// Sign up - Crud
userRouter.get('/signup', (req, res) => res.render('auth/signup'));

userRouter.post('/signup', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    await pwHash
    await User.create({ username, passwordHash });
    console.log(username, "added to the db.");
    res.redirect('/signup');
  } catch (err) {
    console.error("SIGNUP ERROR =>", err);
  }
})

module.exports = userRouter;