const URLParse = require('url-parse');
const jsdom = require('jsdom');
const axios = require('axios');

const foodnetwork = require('./foodnetwork');
const allrecipes = require('./allrecipes');
const myrecipes = require('./myrecipes');
const geniuskitchen = require('./geniuskitchen');

const { JSDOM } = jsdom;

const stripWebsite = async (recipeURL) => {
  const parsedURL = URLParse(recipeURL);

  try {
    const hostname = parsedURL.hostname;

    const res = await axios.get(parsedURL.href);
    const html = res.data;
    const dom = new JSDOM(html);

    let results = {};

    if (hostname === 'www.foodnetwork.com') {
      results = { ...foodnetwork(dom) }
    } else if (hostname === 'allrecipes.com') {
      results = { ...allrecipes(dom) };
    } else if (
      hostname === 'www.myrecipes.com' ||
      hostname === 'www.realsimple.com' ||
      hostname === 'www.health.com'
    ) {
      results = { ...myrecipes(dom) };
    } else if (hostname === 'www.geniuskitchen.com') {
      results = { ...geniuskitchen(dom) };
    }

    return {
      ...results,
      url: {
        hostname: parsedURL.hostname,
        href: parsedURL.href,
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = stripWebsite
