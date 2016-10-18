const getKMS = require('../sdk/getKMS')

const decrypt = (CiphertextBlob, EncryptionContext) =>
  getKMS().decrypt(Object.assign({CiphertextBlob, EncryptionContext})).promise()
  .catch((e) => {
    console.log(`Couldn't decrypt blob`)
    throw e
  })

module.exports = decrypt
