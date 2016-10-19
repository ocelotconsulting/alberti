const decrypt = require('./aws/iam/decrypt')
const winston = require('winston')
const config = require('../config/default.json')
const getSecretVersion = require('./getSecretVersion')
const queryLatestSecretVersion = require('./queryLatestSecretVersion')
const decryptSecret = require('./util/secretCrypto').decryptSecret
const getHMACDigest = require('./util/getHMACDigest')

const secretPromise = (version) => (version) ? getSecretVersion(version) : queryLatestSecretVersion

const getSecret = (name, version, context) =>
  secretPromise(version)(config['secret-table'], name)
  .then((item) =>
    decrypt(new Buffer(item['key'], 'base64'), context)
    .then((kmsResponse) => {
      if (getHMACDigest(kmsResponse['Plaintext'].toString('hex', 32), item['digest'], item['contents']) !== item['hmac']) {
        winston.error(`Computed HMAC on ${name} does not match stored HMAC`)
        throw new Error(`Computed HMAC on ${name} does not match stored HMAC`)
      }
      return decryptSecret(kmsResponse['Plaintext'].toString('hex', 0, 32), item['contents'])
    })
  )

module.exports = getSecret
