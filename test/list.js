const listSecrets = require('../src/listSecrets')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(listSecrets(config['secret-table']))
