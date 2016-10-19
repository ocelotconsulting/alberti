const createTable = require('../src/createTable')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(createTable(config['secret-table']))
