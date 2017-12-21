const fs = require('fs');
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;

const config = JSON.parse(fs.readFileSync('./.config', { encoding: 'utf8' }));
const username = encodeURIComponent(config.mongodb.username);
const password = encodeURIComponent(config.mongodb.password);

const uri = `mongodb://${username}:${password}@ds161446.mlab.com:61446/recipe`; // eslint-disable-line

let _db;

const connectDB = (callback) => {
  MongoClient.connect(uri, (err, db) => {
    const recipeCollection = db.collection('recipe');

    _db = {
      raw: db,
      recipe: recipeCollection,
    };
    return callback(err);
  });
};

const db = () => {
  return _db;
};

const disconnectDB = () => _db.close();

module.exports = {
  connectDB,
  db,
  disconnectDB,
  Mongo,
};
