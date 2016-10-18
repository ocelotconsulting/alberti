const generateKey = require('./aws/iam/generateKey')
const getDynamoDB = require('./aws/sdk/getDynamoDB')
const crypto = require('crypto')
const winston = require('winston')
const config = require('../config/default.json')

const encryptSecret = (key, plainText) => {
  const cipher = crypto.createCipher(config['cipher-algorithm'], key)
  var crypted = cipher.update(plainText, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

const putSecretVersion = (TableName, Item, ConditionExpression) => {
  winston.info(`Trying to save ${JSON.stringify(Item)}`)
  return getDynamoDB().put({
    TableName,
    Item,
    ConditionExpression,
    ExpressionAttributeNames: {
      '#n': 'name'
    }
  }).promise()
}

const putSecret = (name, secret, version, EncryptionContext) =>
  generateKey(config['master-cmk-alias'], EncryptionContext, 64)
  .then((key) => {
    const keyBuffer = new Buffer(key['Plaintext'])
    const dataKey = keyBuffer.toString('hex', 0, 32)
    const hmacKey = keyBuffer.toString('hex', 32)
    const cipherText = encryptSecret(dataKey, secret)
    const hmac = crypto.createHmac(config['digest'], hmacKey)
    hmac.update(cipherText)
    return putSecretVersion(config['secret-table'], {
      name,
      version: ('0000000000000000000' + version || 1).slice(-19),
      key: new Buffer(key['CiphertextBlob']).toString('base64'),
      contents: cipherText,
      hmac: hmac.digest('hex'),
      digest: config['digest']
    }, 'attribute_not_exists(#n)')
  })

module.exports = putSecret
