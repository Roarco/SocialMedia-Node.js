const express = require('express');
const app = express();
const config = require('../../config');
const post = require('./components/post/network');
const { logErrors, errorHandler, boomErrorHandler} = require('../../network/errors');

app.use(express.json());

//Router set
app.use('/post', post);

//Error handler
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.postService.port, () => {
    console.log('Listening micro service post on port', config.postService.port);
});