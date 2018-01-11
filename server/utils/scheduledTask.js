const axios = require('axios');

const updateNPWebsites = require('./updateNPWebsites');

const updateNPWebsitesTask = () => {
  const interval = process.env.NODE_ENV === 'dev' ? 10000 : 18000000;
  setInterval(() => updateNPWebsites.checkProcessableWebsites(), interval);
};

const noSleep = () => {
  if (process.env.NODE_ENV === 'prod') {
    const maxInterval = 3300000;
    const minInterval = 1800000;

    const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

    setInterval(() => axios.get('http://www.mysavedrecipes.com'), interval);
  }
};

const runTasks = () => {
  updateNPWebsitesTask();
  noSleep();
};

module.exports = { runTasks };
