const crypto = require('crypto')
const config = require('../../config/default.json')

const decryptSecret = (key, cipherText) => {
  const decipher = crypto.createDecipher(config['cipher-algorithm'], key)
  var dec = decipher.update(cipherText, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

const encryptSecret = (key, plainText) => {
  const cipher = crypto.createCipher(config['cipher-algorithm'], key)
  var enc = cipher.update(plainText, 'utf8', 'hex')
  enc += cipher.final('hex')
  return enc
}

module.exports = { decryptSecret, encryptSecret }
