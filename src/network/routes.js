const express = require('express');
const router = express.Router();

const user = require('../components/user/network');

const routes = (app) => {
    app.use('/api', router);
    router.use("/user", user);
}

module.exports = routes;