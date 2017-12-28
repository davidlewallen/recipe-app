const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String },
  info: {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  savedRecipes: [Schema.Types.ObjectId],
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
