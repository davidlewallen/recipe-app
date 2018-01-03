const NPWebsite = require('../models/npwebsite');

const save = async (parsedURL, userId) => {
  const { hostname, href } = parsedURL;

  const result = await NPWebsite.find({ hostname });
  const exists = !!result.length;

  if (exists) {
    await NPWebsite.findOneAndUpdate(
      { hostname },
      { $push: { submitted: { href, userId } } }
    );
  } else {
    const newNPWebsite = new NPWebsite({
      hostname,
      submitted: [{ href, userId }]
    });

    await newNPWebsite.save();
  }
}

module.exports = {
  save
};
