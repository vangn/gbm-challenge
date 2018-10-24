require('babel-register');
const compression = require('compression');
const bodyparser = require('body-parser');

const GBMRoutes = require('./routes/gbm-routes');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const staticCustomAssets = path.join(__dirname, '../..');

app.use(compression());
app.use(bodyparser.json({ limit: '5MB', extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/dist', express.static(path.join(staticCustomAssets, 'dist')));

new GBMRoutes(app);

app.listen(port, '0.0.0.0');
console.log(`Server is Up and Running at Port ${port}`);
