const Account = require('../models/account');

const createTestAccount = async (append) => {
  const account = new Account({
    username: `testUsername${append}`,
    password: `testPassword${append}`,
    info: {
      firstName: `testFirstname${append}`,
      lastName: `testLastname${append}`,
      email: `testEmail${append}`,
    },
  });

  return await account.save();
}

module.exports = {
  createTestAccount,
}
