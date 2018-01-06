const mongoose = require('mongoose');

// Set up mongo connection
require('../../db');

const Account = require('../account');

const AccountModel = require('../../models/account');

const clearDB = require('../../utils/clearDB');

describe('Account Controller Test', () => {
  beforeAll(async () => {
    await clearDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  })

  it('should create a test account', async () => {
    let result = await AccountModel.find({});
    expect(result.length).toEqual(0);
    
    await Account.createTestAccount('1');

    result = await AccountModel.find({});
    expect(result.length).toEqual(1);
  })
})
