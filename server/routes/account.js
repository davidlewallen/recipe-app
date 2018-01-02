const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('../models/account');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.post('/register', (req, res) => {
  Account.register(
    new Account({
      username: req.body.username,
      info: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log('error', err);
        return res.status(409).send(err);
      }
      passport.authenticate('local')(req, res, () => {
        res.send(req.user)
      })
    }
  )}
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
