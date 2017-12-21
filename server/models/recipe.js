const { db, Mongo } = require('../db');
const stripWebsite = require('./websiteRules');

const submit = async (parsedURL) => {
  try {
    const dbResults = await db()
      .recipe
      .find({
        "url.href": {
          $eq: parsedURL.href
        }
      })
      .toArray();
    const exist = dbResults.length > 0 ? true : false;

    if (!exist) {
      const modData = {
        ...await stripWebsite(parsedURL),
        created: Date.now(),
        updated: null,
      };
      const result = await db().recipe.insertOne(modData);
      return result.ops[0];
    }
    
    return dbResults[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  submit,
}
