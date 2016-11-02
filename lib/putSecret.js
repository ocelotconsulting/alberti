const generateKey = require('./aws/iam/generateKey')
const putSecretVersion = require('./putSecretVersion')
const getHMACDigest = require('./util/getHMACDigest')
const encryptSecret = require('./util/secretCrypto').encryptSecret

const putSecret = (cmkAlias, region, secretTable, digest) => (name, secret, version, EncryptionContext) =>
  generateKey(region)(cmkAlias, EncryptionContext, 64)
  .then((key) => {
    const keyBuffer = new Buffer(key['Plaintext'])
    const cipherText = encryptSecret(keyBuffer.toString('hex', 0, 32), secret)
    return putSecretVersion(region)(secretTable, {
      name,
      version: ('0000000000000000000' + version || 1).slice(-19),
      key: new Buffer(key['CiphertextBlob']).toString('base64'),
      contents: cipherText,
      hmac: getHMACDigest(keyBuffer.toString('hex', 32), digest, cipherText),
      digest: digest
    }, 'attribute_not_exists(#n)')
  })

module.exports = putSecret
