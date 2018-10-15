const Account = require('../../models/account');

const verification = require('./verification');

const createTestAccount = async (append) => {
  const account = new Account({
    password: `testPassword${append}`,
    email: `testEmail${append}@test.com`,
  });

  return await account.save();
};

const getUserById = async userId => (
  await Account.findById(userId, '_id email verification savedRecipes')
);

const getUserByEmail = async email => (
  await Account.findOne({
    'email': email
  })
);

module.exports = {
  createTestAccount,
  getUserById,
  getUserByEmail,
  verification,
};
