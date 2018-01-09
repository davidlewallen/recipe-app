const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('../models/account');

// TODO: Remove lockdown
// router.post('/login', passport.authenticate('local'), (req, res) => {
router.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.body.lockdownPhrase === process.env.LOCKDOWN_PHRASE) {
    const userObject = {
      _id: req.user._id,
      username: req.user.username,
      savedRecipes: req.user.savedRecipes,
    }
    res.json(userObject);
  } else {
    req.logout();
    res.redirect('/');
  }
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
