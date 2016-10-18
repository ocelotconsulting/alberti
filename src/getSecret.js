const getDynamoDB = require('./aws/sdk/getDynamoDB')
const decrypt = require('./aws/iam/decrypt')
const winston = require('winston')
const crypto = require('crypto')
const config = require('../config/default.json')

const queryLatest = (TableName, name) =>
  getDynamoDB().query({
    TableName,
    Limit: 1,
    ScanIndexForward: false,
    ConsistentRead: true,
    KeyConditionExpression: '#n = :name',
    ExpressionAttributeValues: {
      ':name': name
    },
    ExpressionAttributeNames: {
      '#n': 'name'
    }
  }).promise()
  .then((result) => {
    if (result.Count === 0) {
      winston.error(`Item {'name': '${name}'} couldn't be found.`)
      throw new Error(`Item {'name': '${name}'} couldn't be found.`)
    }
    return result.Items[0]
  })

const getSecretVersion = (version) => (TableName, name) =>
  getDynamoDB().get({
    TableName,
    Key: {
      name,
      version: ('0000000000000000000' + version).slice(-19)
    }
  }).promise()
  .then((result) => {
    if (!result.Item) {
      winston.error(`Item {'name': '${name}', 'version': '${version}'} couldn't be found.`)
      throw new Error(`Item {'name': '${name}', 'version': '${version}'} couldn't be found.`)
    }
    return result.Item
  })

const secretPromise = (version) => (version) ? getSecretVersion(version) : queryLatest

const decryptSecret = (key, cipherText) => {
  const decipher = crypto.createDecipher(config['cipher-algorithm'], key)
  var dec = decipher.update(cipherText, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

const getSecret = (name, version, context) =>
  secretPromise(version)(config['secret-table'], name)
  .then((item) =>
    decrypt(new Buffer(item['key'], 'base64'), context)
    .then((kmsResponse) => {
      winston.info(`Received secret response of ${kmsResponse['Plaintext'].toString('hex')}`)
      const key = kmsResponse['Plaintext'].toString('hex', 0, 32)
      const hmacKey = kmsResponse['Plaintext'].toString('hex', 32)
      const hmac = crypto.createHmac(item['digest'] || config['digest'], hmacKey)
      hmac.update(item['contents'])
      if (hmac.digest('hex') !== item['hmac']) {
        winston.error(`Computed HMAC on ${name} does not match stored HMAC`)
        throw new Error(`Computed HMAC on ${name} does not match stored HMAC`)
      }
      return decryptSecret(key, item['contents'])
    })
  )

module.exports = getSecret
