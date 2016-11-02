const crypto = require('crypto')

const decryptSecret = (algo) => (key, cipherText) => {
  const decipher = crypto.createDecipher(algo, key)
  var dec = decipher.update(cipherText, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

const encryptSecret = (algo) => (key, plainText) => {
  const cipher = crypto.createCipher(algo, key)
  var enc = cipher.update(plainText, 'utf8', 'hex')
  enc += cipher.final('hex')
  return enc
}

module.exports = (algo) => ({
  decryptSecret: decryptSecret(algo),
  encryptSecret: encryptSecret(algo)
})
