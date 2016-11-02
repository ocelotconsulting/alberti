const listSecrets = require('../lib/listSecrets')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(listSecrets(config['aws-region'])(config['secret-table']))
