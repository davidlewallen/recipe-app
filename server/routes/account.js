const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('../models/account');

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

      const userObject = {
        _id: req.user.id,
        username: req.user.username,
        savedRecipes: req.user.savedRecipes,
      };

      return res.json(userObject);
    });
  })(req, res, next);
});

router.post('/register', (req, res) => {
  Account.register(
    new Account({
      username: req.body.username,
      email: req.body.email,
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
      passport.authenticate('local')(req, res, () => {
        const userObject = {
          _id: req.user._id,
          username: req.user.username,
          savedRecipes: req.user.savedRecipes,
        }
        res.send(userObject)
      })
    }
  )}
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth', (req, res) => {
  const isAuth = req.isAuthenticated();
  const result = { isAuth };

  res.json(result);
});

module.exports = router;
