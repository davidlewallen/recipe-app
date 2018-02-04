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

module.exports = {
  createTestAccount,
  getUser,
};
