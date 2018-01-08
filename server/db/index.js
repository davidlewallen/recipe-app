const mongoose = require('mongoose');

module.exports = {
  start: async () => {
    let uri;
    const USERNAME = encodeURI(process.env.MONGO_USERNAME);
    const PASSWORD = encodeURI(process.env.MONGO_PASSWORD)
    if (process.env.NODE_ENV === 'dev') {
      uri = `mongodb://${USERNAME}:${PASSWORD}@ds163836.mlab.com:63836/recipe-dev`;
    } else if (process.env.NODE_ENV === 'test') {
      uri = `mongodb://${USERNAME}:${PASSWORD}@ds133547.mlab.com:33547/recipe-test`
    } else {
      uri = `mongodb://${USERNAME}:${PASSWORD}@ds161446.mlab.com:61446/recipe`;
    }
    mongoose.Promise = global.Promise;
    await mongoose.connect(uri, { useMongoClient: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    if (process.env.NODE_ENV !== 'test') {
      db.once('open', () => console.log('connected mongoose'));
    }
  }
}
