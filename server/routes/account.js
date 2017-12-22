const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('../models/account');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.post('/register', function (req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
    if (err) {
      console.log('error', err);
      return res.send('error');
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

module.exports = router;
