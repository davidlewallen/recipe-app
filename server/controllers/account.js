const nodemailer = require('nodemailer');

const Account = require('../models/account');

const createTestAccount = async (append) => {
  const account = new Account({
    username: `testUsername${append}`,
    password: `testPassword${append}`,
    email: `testEmail${append}@test.com`,
  });

  return await account.save();
};

const getUser = async (userId) => {
  try {
    const userResult = await Account.findById(userId, '_id username email');
    return userResult;
  } catch (err) {
    console.log('err', err);
  }
};

const sendVerificationEmail = (res, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'My Saved Recipes - Email Verification',
    text: 'This is a test email',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return res.status(201).send('Account created successfully');
};

module.exports = {
  createTestAccount,
  getUser,
  sendVerificationEmail
};
