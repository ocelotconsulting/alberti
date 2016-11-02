const getSecret = require('../lib/getSecret')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(getSecret(config['aws-region'], config['secret-table'])('test', 1, { }))
