const express = require('express');
const router = express.Router();
const passport = require('passport');
const uuidv1 = require('uuid/v1');
const moment = require('moment');

const AccountModel = require('../models/account');
const Account = require('../controllers/account');

const { isAuthenticated } = require('./utils');

router.post('/login', (req, res, next) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res
      .status(400)
      .json({
        message: 'Body should contain a "username" and "password" field'
      });
  } else if (!req.body.username) {
    return res
      .status(400)
      .json({
        message: 'Enter a valid username'
      });
  } else if (!req.body.password) {
    return res
    .status(400)
    .json({
      message: 'Enter a valid password'
    });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('err', err);
      return next(err);
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Incorrect username and/or password.'});
    }

    req.login(user, loginErr => {
      if (loginErr) {
        console.log('loginErr', loginErr);
        return next(loginErr);
      }

      return res.send(true);
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  AccountModel.register(
    new AccountModel({
      username: req.body.username,
      email: req.body.email,
      verification: {
        status: false,
        key: uuidv1(),
        expires: moment().add(30, 'days'),
      },
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log('error', err);
        if (err.hasOwnProperty('_message')) {
          return res.status(400).json({ message: err.errors.email.message });
        }

        return res.status(409).send(err);
      }

      Account.sendVerificationEmail(req.body.email);

      res.status(201).send('Account created successfully');

    }
  );
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth', (req, res) => {
  const isAuth = req.isAuthenticated();
  const result = { isAuth };

  res.json(result);
});

router.get('/user', isAuthenticated, async (req, res) => {
  res.json(await Account.getUser(req.user._id));
});

module.exports = router;
