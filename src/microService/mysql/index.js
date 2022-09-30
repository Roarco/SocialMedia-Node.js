const express = require('express');
const app = express();
const config = require('../../config');
const routes = require('./network');
const { logErrors, errorHandler, boomErrorHandler} = require('../../network/errors');

app.use(express.json());

//Router set
app.use('/', routes);

//Error handler
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(config.mysqlService.port, () => {
    console.log('Listening micro service mysql on port', config.mysqlService.port);
});
