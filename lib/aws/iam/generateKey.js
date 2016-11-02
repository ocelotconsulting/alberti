const getKMS = require('../sdk/getKMS')
const winston = require('winston')

const generateKey = (region) => (KeyId, EncryptionContext, NumberOfBytes) =>
  getKMS(region).generateDataKey(Object.assign({
    KeyId, EncryptionContext, NumberOfBytes
  })).promise()
  .catch((e) => {
    winston.error(`Couldn't create key ${e.stack}`)
    throw e
  })

module.exports = generateKey
