const express = require('express');
const app = express();
const config = require('../../config');
const post = require('./components/post/network');

app.use(express.json());

//Router set
app.use('/post', post);

app.listen(config.postService.port, () => {
    console.log('Listening micro service post on port', config.postService.port);
});