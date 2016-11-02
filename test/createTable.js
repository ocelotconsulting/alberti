const createTable = require('../lib/createTable')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(createTable(config['aws-region'])(config['secret-table']))
