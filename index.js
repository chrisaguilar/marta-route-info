const { join } = require('path');

const express = require('express');

const app = express();

// Set the "views" directory
app.set('views', join(__dirname, 'views'));

// Mount the static files on the root path
app.use('/', express.static(join(__dirname, 'public')));

// Mount the api on the '/api' path.
app.use('/api', require('./routes/api'));

// Export the app as a sub-app
module.exports = app;
