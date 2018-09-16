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

const getUserById = async userId => (
  await Account.findById(userId, '_id username email verification savedRecipes')
);

const getUserByUsername = async username => (
  await Account.findOne({ 'username': username })
);

const sendVerificationEmail = (user) => {
  const verificationParams = `id=${user._id}&key=${user.verification.key}`;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'My Saved Recipes - Email Verification',
    text: `
      Thank you for signing up with My Saved Recipes!

      Please follow the link below to verify your account.

      www.mysavedrecipes.com/#/email/verify?${verificationParams}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const verify = async (res, user, key) => {
  if (user.verification.status) {
    return res.status(200).send({
      alreadyVerified: true
    });
  }

  if (user.verification.key === key) {
    if (Date.now() < new Date(user.verification.expires)) {
      await Account.findByIdAndUpdate(
        user._id, {
          verification: {
            status: true,
          },
        },
      );
      return res.sendStatus(200);
    } else {
      return res.status(400).send({ verificationExpired: true });
    }
  }

  return res.status(400).send({ nonMatchingKey: true });
};

module.exports = {
  createTestAccount,
  getUserById,
  getUserByUsername,
  sendVerificationEmail,
  verify,
};
