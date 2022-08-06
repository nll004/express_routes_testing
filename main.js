const express = require('express');
const item_routes = require('./item_routes')

const app = express();

app.use('/items', item_routes);



module.exports = app;
