const putSecret = require('../lib/putSecret.js')
const localPromise = require('./localPromise')
const config = require('../config/default.json')

localPromise(putSecret(config['master-cmk-alias'], config['aws-region'], config['secret-table'], config['digest'])('test', 'abc123', 1, { }))
