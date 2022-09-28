require("dotenv").config();

const config = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "notasecret!",
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE ,
  },
  mysqlService: {
    port: process.env.MYSQL_SERVICE_PORT || 3002,
    host: process.env.MYSQL_SERVICE_HOST || "localhost",
  },
  postService: {
    port: process.env.POST_SERVICE_PORT || 3003,
  },
};

module.exports = config;