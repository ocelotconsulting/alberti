const deleteSecret = require('../src/deleteSecret')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(deleteSecret(config['secret-table'], 'test'))
