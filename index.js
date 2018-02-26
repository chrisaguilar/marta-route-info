const { join } = require('path');

const express = require('express');

const app = express();

app.set('port', parseInt(process.env.PORT, 10));

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'client', 'views'));

app.get('/', (req, res) => res.render('index'));
app.use('/', express.static(join(__dirname, 'client')));

app.use('/api', require('./server/routes/api'));

app.listen(app.get('port'), () => console.log(`/marta listening on ${app.get('port')}`));
