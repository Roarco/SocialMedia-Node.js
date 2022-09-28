const express = require('express');
const app = express();
const config = require('../../config');
const routes = require('./network');

app.use(express.json());

//Router set
app.use('/', routes);


app.listen(config.mysqlService.port, () => {
    console.log('Listening micro service mysql on port', config.mysqlService.port);
});
