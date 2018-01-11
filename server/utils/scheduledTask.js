const axios = require('axios');

const updateNPWebsites = require('./updateNPWebsites');

const updateNPWebsitesTask = () => {
  const interval = process.env.NODE_ENV === 'dev' ? 10000 : 18000000;
  setInterval(() => updateNPWebsites.checkProcessableWebsites(), interval);
};

const noSleep = () => {
  if (process.env.NODE_ENV === 'prod') {
    setInterval(() => axios.get('http://www.mysavedrecipes.com'), 5000);
  }
};

const runTasks = () => {
  updateNPWebsitesTask();
  noSleep();
};

module.exports = { runTasks };
