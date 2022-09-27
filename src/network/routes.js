const express = require('express');
const router = express.Router();

const user = require('../components/user/network');
const auth = require("../components/auth/network");
const post = require('../components/post/network');

const routes = (app) => {
    app.use('/api', router);
    router.use("/user", user);
    router.use("/auth", auth);
    router.use("/post", post);
}

module.exports = routes;