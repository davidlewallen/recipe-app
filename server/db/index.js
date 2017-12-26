const fs = require('fs');
const mongoose = require('mongoose');

const config = JSON.parse(fs.readFileSync('./.config', { encoding: 'utf8' }));
const username = encodeURIComponent(config.mongodb.username);
const password = encodeURIComponent(config.mongodb.password);

let uri;
if (process.env.NODE_ENV === 'prod') {
  uri = `mongodb://${username}:${password}@ds161446.mlab.com:61446/recipe`;
} else if (process.env.NODE_ENV === 'dev') {
  uri = `mongodb://${username}:${password}@ds163836.mlab.com:63836/recipe-dev`;
}
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('connected mongoose'));
