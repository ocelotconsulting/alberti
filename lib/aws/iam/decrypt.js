const getKMS = require('../sdk/getKMS')

const decrypt = (region) => (CiphertextBlob, EncryptionContext) =>
  getKMS(region).decrypt(Object.assign({CiphertextBlob, EncryptionContext})).promise()
  .catch((e) => {
    console.log(`Couldn't decrypt blob`)
    throw e
  })

module.exports = decrypt
