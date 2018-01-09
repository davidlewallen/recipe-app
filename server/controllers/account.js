const Account = require('../models/account');

const createTestAccount = async (append) => {
  const account = new Account({
    username: `testUsername${append}`,
    password: `testPassword${append}`,
    email: `testEmail${append}@test.com`,
  });

  return await account.save();
}

module.exports = {
  createTestAccount,
}
