const mongoose = require('mongoose');

// Set up mongo connection
require('../../db');

const Account = require('../account');

describe('Account Model Test', () => {
  beforeAll(async () => {
    await Account.remove({});
  })

  beforeEach(async () => {
    await Account.remove({});
  });

  afterAll(() => {
    mongoose.connections.close();
  });

  describe('save', () => {
    it('should save an account to the account collection', async () => {
      let result = await Account.find({});
      expect(result.length).toEqual(0);

      const newAccount = new Account({
        username: 'testUsername',
        password: 'testPassword',
        info: {
          firstName: 'testFirstName',
          lastName: 'testLastName',
          email: 'test@email.com',
        }
      });
      await newAccount.save();

      result = await Account.find({});
      expect(result.length).toEqual(1);
    });

    it('should return an error if correct fields arent passed when saving an account', async () => {
      const newAccount = new Account({
        password: 'testPassword',
        info: {
          firstName: 'testFirstName',
          lastName: 'testLastName',
          email: 'test@email.com',
        }
      });

      try {
        await newAccount.save();
      } catch (err) {
        expect(err.name).toEqual('ValidationError')
        expect(err._message).toEqual('Account validation failed')
      }
    })
  });
})
