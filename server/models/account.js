const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { isEmail } = require('validator');

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String },
  email: {
    type: String,
    require: true,
    validate: [isEmail, 'invalid email'],
  },
  savedRecipes: [Schema.Types.ObjectId],
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema);
