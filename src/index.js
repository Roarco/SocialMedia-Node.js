const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./network/routes');
const port = config.port;
const swagger = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

//Router set
routes(app);

app.listen(port, listen);

function listen() {
    console.log(`Example app listening at http://localhost:${port}`);
}