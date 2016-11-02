const getHighestVersion = require('../lib/getHighestVersion.js')
const config = require('../config/default.json')
const localPromise = require('./localPromise')

localPromise(getHighestVersion(config['aws-region'])(config['secret-table'], 'test'))
