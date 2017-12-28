const { join } = require('path');

const express = require('express');

const app = express();

// Mount the static files on the root path
app.use('/', express.static(join(__dirname, 'public')));
app.use('/', express.static(join(__dirname, 'views')));

// Mount the api on the '/api' path.
app.use('/api', require('./routes/api'));

// Export the app as a sub-app
module.exports = app;
