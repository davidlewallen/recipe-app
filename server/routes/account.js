const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('../models/account');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.post('/register', function (req, res) {
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function (err, account) {
      if (err) {
        console.log('error', err);
        return res.send(err, 409);
      }
  passport.authenticate('local')(req, res, function () {
      res.send(req.user)
    });
  });
});

module.exports = router;
