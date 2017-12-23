const fs = require('fs');
const mongoose = require('mongoose');

const config = JSON.parse(fs.readFileSync('./.config', { encoding: 'utf8' }));
const username = encodeURIComponent(config.mongodb.username);
const password = encodeURIComponent(config.mongodb.password);

const uri = `mongodb://${username}:${password}@ds161446.mlab.com:61446/recipe`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('connected mongoose'));
