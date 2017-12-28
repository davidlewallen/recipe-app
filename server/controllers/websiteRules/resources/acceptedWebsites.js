const foodnetwork = require('../foodnetwork');
const allrecipes = require('../allrecipes');
const myrecipes = require('../myrecipes');
const geniuskitchen = require('../geniuskitchen');

const acceptedWebsites = [
  { hostname: 'www.foodnetwork.com', func: foodnetwork },
  { hostname: 'allrecipes.com', func: allrecipes },
  { hostname: 'www.myrecipes.com', func: myrecipes },
  { hostname: 'www.realsimple.com', func: myrecipes },
  { hostname: 'www.health.com', func: myrecipes },
  { hostname: 'www.geniuskitchen.com', func: geniuskitchen },
]

module.exports = acceptedWebsites;
