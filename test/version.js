const getHighestVersion = require('../src/getHighestVersion.js')
const config = require('../config/default.json')
const localPromise = require('./localPromise')

localPromise(getHighestVersion(config['secret-table'], 'test'))
