const express = require('express');
const router = express.Router();
const passport = require('passport');

const AccountModel = require('../models/account');

const Account = require('../controllers/account');

const {
  isAuthenticated
} = require('./utils');

router.post('/login', (req, res, next) => {
  if (req.body.email === undefined || req.body.password === undefined) {
    return res
      .status(400)
      .json({
        message: 'Body should contain a "email" and "password" field'
      });
  } else if (!req.body.email) {
    return res
      .status(400)
      .json({
        message: 'Enter a valid email'
      });
  } else if (!req.body.password) {
    return res
      .status(400)
      .json({
        message: 'Enter a valid password'
      });
  }

  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      console.log('err', err);
      return next(err);
    }

    if (!user) {
      return res
        .status(400)
        .json({
          message: 'Incorrect email and/or password.'
        });
    }

    const {
      verification
    } = await Account.getUserByEmail(req.body.email);

    if (verification.status) {
      return req.login(user, loginErr => {
        if (loginErr) {
          console.log('loginErr', loginErr);
          return next(loginErr);
        }

        return res.send(true);
      });
    }

    return res.status(403).send({
      verified: false
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  AccountModel.register(
    new AccountModel({
      email: req.body.email
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log('error', err);
        if (err.hasOwnProperty('_message')) {
          return res.status(400).json({
            message: err.errors.email.message
          });
        }

        return res.status(409).send(err);
      }

      Account.verification.sendVerificationEmail(user);

      return res.status(201).send('Account created successfully');
    }
  );
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth', (req, res) => {
  const isAuth = req.isAuthenticated();
  const result = {
    isAuth
  };

  res.json(result);
});

router.get('/user', isAuthenticated, async (req, res) => {
  res.json(await Account.getUserById(req.user._id));
});

router.get('/verify', async (req, res) => {
  const user = await Account.getUserById(req.query.id);

  return Account.verification.verify(res, user, req.query.key);
});

router.get('/verify/resend', async (req, res) => {
  await Account.verification.resendVerificationEmail(req.query.id);

  return res.sendStatus(200);
});

module.exports = router;
