require("dotenv").config();

const config = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "notasecret!",
};

module.exports = config;