const getKMS = require('../sdk/getKMS')
const winston = require('winston')

const generateKey = (KeyId, EncryptionContext, NumberOfBytes) =>
  getKMS().generateDataKey(Object.assign({
    KeyId, EncryptionContext, NumberOfBytes
  })).promise()
  .catch((e) => {
    winston.error(`Couldn't create key ${e.stack}`)
    throw e
  })

module.exports = generateKey
