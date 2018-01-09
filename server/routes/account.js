const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('../models/account');

router.post('/login', passport.authenticate('local'), (req, res) => {
  const userObject = {
    _id: req.user._id,
    username: req.user.username,
    savedRecipes: req.user.savedRecipes,
    info: req.user.info,
  }
  res.json(userObject);
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
})

module.exports = router;
