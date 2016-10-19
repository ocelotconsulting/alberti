const crypto = require('crypto')
const config = require('../../config/default.json')

const getHMACDigest = (key, algo, data) => {
  const hmac = crypto.createHmac(algo || config['digest'], key)
  hmac.update(data)
  return hmac.digest('hex')
}

module.exports = getHMACDigest
