const remote = require('./remote')
const config = require('../config')

const store = remote(config.mysqlService.host, config.mysqlService.port)

module.exports = store
