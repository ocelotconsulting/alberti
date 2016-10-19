const getSecret = require('../src/getSecret')
const localPromise = require('./localPromise')

localPromise(getSecret('test', 1, { }))
