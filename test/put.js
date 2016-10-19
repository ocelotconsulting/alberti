const putSecret = require('../src/putSecret.js')
const localPromise = require('./localPromise')

localPromise(putSecret('test', 'abc123', 1, { }))
