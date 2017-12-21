const stripWebsite = require('./websiteRules');

const submit = (recipeURL) => {
  return stripWebsite(recipeURL);
};

module.exports = {
  submit,
}
