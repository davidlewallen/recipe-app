const foodnetwork = require('../foodnetwork');
const allrecipes = require('../allrecipes');
const myrecipes = require('../myrecipes');
const geniuskitchen = require('../geniuskitchen');

const acceptedWebsites = [
  { hostname: 'www.foodnetwork.com', func: foodnetwork.strip },
  { hostname: 'allrecipes.com', func: allrecipes.strip },
  { hostname: 'www.myrecipes.com', func: myrecipes.strip },
  { hostname: 'www.realsimple.com', func: myrecipes.strip },
  { hostname: 'www.health.com', func: myrecipes.strip },
  { hostname: 'www.geniuskitchen.com', func: geniuskitchen.strip },
]

module.exports = acceptedWebsites;
