const deleteSecret = require('../lib/deleteSecret')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(deleteSecret(config['aws-region'])(config['secret-table'], 'test'))
