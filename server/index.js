const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();

const PORT = process.env.PORT || 3001;
const assetFolder = path.join(__dirname, '..', 'build');
const routes = require('./routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(assetFolder));

app.get('/', (req, res) => {
  res.sendFile(assetFolder + '/index.html');
})

app.use('/api', routes);

app.get('*', (req, res) => {
  res.send('404 Page Does Not Exist')
})

app.listen(PORT, () => console.log('Listening on port 3001'));
