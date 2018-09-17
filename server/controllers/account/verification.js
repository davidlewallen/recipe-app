const nodemailer = require('nodemailer');
const uuidv1 = require('uuid/v1');
const moment = require('moment');

const Account = require('../../models/account');

const setAccountToUnverified = async (id) => {
  const verificationKey = uuidv1();

  await Account.findByIdAndUpdate(
    id,
    {
      verification: {
        status: false,
        key: verificationKey,
        expires: moment().add(7, 'days'),
      },
    },
  );

  return verificationKey;
};

const setAccountToVerified = async (id) => {
  await Account.findByIdAndUpdate(
    id,
    {
      verification: {
        status: true,
      },
    },
  );
};

const sendVerificationEmail = async (user) => {
  const verificationKey = await setAccountToUnverified(user._id);

  const verificationParams = `id=${user._id}&key=${verificationKey}`;

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

const resendVerificationEmail = async (id) => {
  const user = await Account.findById(id);

  return sendVerificationEmail(user);
};

const verify = async (res, user, key) => {
  if (user.verification.status) {
    return res.status(200).send({
      alreadyVerified: true
    });
  }

  if (user.verification.key === key) {
    if (Date.now() < new Date(user.verification.expires)) {
      await setAccountToVerified(user._id);

      return res.sendStatus(200);
    } else {
      return res.status(400).send({
        verificationExpired: true
      });
    }
  }

  return res.status(400).send({
    nonMatchingKey: true
  });
};

module.exports = {
  sendVerificationEmail,
  resendVerificationEmail,
  verify,
};
