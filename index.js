const { join } = require('path');

const express = require('express');
const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use('/api/bus', routes.api.bus);
app.use('/api/rail', routes.api.rail);
app.use('/', routes.views);
app.use('/', routes.public);

module.exports = app;
