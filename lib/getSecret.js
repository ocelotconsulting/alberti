const decrypt = require('./aws/iam/decrypt')
const winston = require('winston')
const getSecretVersion = require('./getSecretVersion')
const queryLatestSecretVersion = require('./queryLatestSecretVersion')
const decryptSecret = require('./util/secretCrypto').decryptSecret
const getHMACDigest = require('./util/getHMACDigest')

const secretPromise = (region, version) => (version) ? getSecretVersion(region, version) : queryLatestSecretVersion(region)

const getSecret = (region, secretTable) => (name, version, context) =>
  secretPromise(region, version)(secretTable, name)
  .then((item) =>
    decrypt(region)(new Buffer(item['key'], 'base64'), context)
    .then((kmsResponse) => {
      if (getHMACDigest(kmsResponse['Plaintext'].toString('hex', 32), item['digest'], item['contents']) !== item['hmac']) {
        winston.error(`Computed HMAC on ${name} does not match stored HMAC`)
        throw new Error(`Computed HMAC on ${name} does not match stored HMAC`)
      }
      return decryptSecret(kmsResponse['Plaintext'].toString('hex', 0, 32), item['contents'])
    })
  )

module.exports = getSecret
