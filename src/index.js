const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./network/routes');
const port = config.port;

app.use(express.json());

//Router set
routes(app);

app.listen(port, listen);

function listen() {
    console.log(`Example app listening at http://localhost:${port}`);
}