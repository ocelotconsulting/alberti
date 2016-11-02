const crypto = require('crypto')

const getHMACDigest = (digest) => (key, algo, data) => {
  const hmac = crypto.createHmac(algo || digest, key)
  hmac.update(data)
  return hmac.digest('hex')
}

module.exports = getHMACDigest
