const mongoose = require('mongoose');
const parseURL = require('url-parse');

require('../../db');

const NPWebsite = require('../npwebsite');
const NPWebsiteModel = require('../../models/npwebsite');
const AccountModel = require('../../models/account');

describe('NPWebsite Controller Test', () => {
  let user = null;
  let user2 = null;
  beforeAll(async (done) => {
    await AccountModel.remove({});
    await NPWebsiteModel.remove({});
    done();
  });

  beforeEach(async (done) => {
    await AccountModel.remove({});
    await NPWebsiteModel.remove({});

    AccountModel.register(
      new AccountModel({
        username: 'test',
        info: {
          firstName: 'test',
          lastName: 'test',
          email: 'test',
        },
      }),
      new Buffer('test'),
      (err, createdUser) => { user = createdUser; }
    );
    AccountModel.register(
      new AccountModel({
        username: 'test2',
        info: {
          firstName: 'test2',
          lastName: 'test2',
          email: 'test2',
        },
      }),
      new Buffer('test2'),
      (err, createdUser) => {
        user2 = createdUser;
        done();
      }
    );
  });

  afterAll(() => {
    mongoose.connection.close()
  });

  describe('save', () => {
    it('should create a new entry to the npwebsite collection if hostname doesnt exist', async () => {
      let result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(0);

      const parsedURL = parseURL('https://www.budgetbytes.com/2011/06/honey-mustard-chicken-strips/');
      await NPWebsite.save(parsedURL, user._id);

      result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(1);
    });

    it('should push to submitted array if hostname already exist and hasnt already been added by user', async () => {
      let result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(0);

      const parsedURL1 = parseURL('https://www.budgetbytes.com/2011/06/honey-mustard-chicken-strips/');
      const parsedURL2 = parseURL('https://www.budgetbytes.com/2011/05/hummus-grilled-vegetable-pizza/');
      await NPWebsite.save(parsedURL1, user._id);
      await NPWebsite.save(parsedURL2, user2._id);

      result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(1);
      expect(result[0].submitted.length).toEqual(2);
      expect(result[0].submitted[0].userId).toEqual(user._id);
      expect(result[0].submitted[1].userId).toEqual(user2._id);
    });

    it('should not not push to submitted array if hostname already exist and has already been added by user', async () => {
      let result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(0);

      const parsedURL1 = parseURL('https://www.budgetbytes.com/2011/06/honey-mustard-chicken-strips/');
      await NPWebsite.save(parsedURL1, user._id);

      result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(1);
      expect(result[0].submitted.length).toEqual(1);
      expect(result[0].submitted[0].userId).toEqual(user._id);
      expect(result[0].submitted[0].href).toEqual(parsedURL1.href);

      await NPWebsite.save(parsedURL1, user._id);
      result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(1);
      expect(result[0].submitted.length).toEqual(1);
      expect(result[0].submitted[0].userId).toEqual(user._id);
      expect(result[0].submitted[0].href).toEqual(parsedURL1.href);
    });
  });

  describe('getHostnames', () => {
    it('should get a list of hostnames from npwebsite', async () => {
      let result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(0);

      const parsedURL1 = parseURL('https://www.budgetbytes.com/2011/06/honey-mustard-chicken-strips/');
      await NPWebsite.save(parsedURL1, user._id);

      result = await NPWebsiteModel.find({});
      const npwebsiteId = result[0]._id;

      result = await NPWebsite.getHostnames();
      expect(result.length).toBe(1)
      expect(result[0].hostname).toEqual(parsedURL1.hostname);
      expect(result[0]._id.equals(npwebsiteId)).toEqual(true);
    });
  });

  describe('getNPWebsite', () => {
    it('should get a npwebsite entry based off of npwebsite._id', async () => {
      let result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(0);

      const parsedURL1 = parseURL('https://www.budgetbytes.com/2011/06/honey-mustard-chicken-strips/');
      await NPWebsite.save(parsedURL1, user._id);

      result = await NPWebsite.getHostnames();
      const npwebsiteId = result[0]._id;

      result = await NPWebsite.getNPWebsite(npwebsiteId);
      expect(result._id.equals(npwebsiteId)).toEqual(true);
      expect(result.submitted.length).toBe(1);
      expect(result.submitted[0].href).toEqual(parsedURL1.href)
      expect(result.submitted[0].userId).toEqual(user._id);
    });
  });

  describe('remove', () => {
    it('should remove a npwebsite entry based off of _id', async () => {
      let result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(0);

      const parsedURL1 = parseURL('https://www.budgetbytes.com/2011/06/honey-mustard-chicken-strips/');
      await NPWebsite.save(parsedURL1, user._id);

      result = await NPWebsite.getHostnames();
      const npwebsiteId = result[0]._id;

      await NPWebsite.remove(npwebsiteId);

      result = await NPWebsiteModel.find({});
      expect(result.length).toEqual(0);
    })
  })
})
