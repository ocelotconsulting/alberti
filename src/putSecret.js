const generateKey = require('./aws/iam/generateKey')
const putSecretVersion = require('./putSecretVersion')
const getHMACDigest = require('./util/getHMACDigest')
const config = require('../config/default.json')
const encryptSecret = require('./util/secretCrypto').encryptSecret

const putSecret = (name, secret, version, EncryptionContext) =>
  generateKey(config['master-cmk-alias'], EncryptionContext, 64)
  .then((key) => {
    const keyBuffer = new Buffer(key['Plaintext'])
    const cipherText = encryptSecret(keyBuffer.toString('hex', 0, 32), secret)
    return putSecretVersion(config['secret-table'], {
      name,
      version: ('0000000000000000000' + version || 1).slice(-19),
      key: new Buffer(key['CiphertextBlob']).toString('base64'),
      contents: cipherText,
      hmac: getHMACDigest(keyBuffer.toString('hex', 32), config['digest'], cipherText),
      digest: config['digest']
    }, 'attribute_not_exists(#n)')
  })

module.exports = putSecret
