const createTable = require('./createTable')
const deleteSecret = require('./deleteSecret')
const getHighestVersion = require('./getHighestVersion.js')
const getSecret = require('./getSecret')
const listSecrets = require('./listSecrets')
const putSecret = require('./putSecret.js')

module.exports = (config) => ({
  createTable: createTable(config['aws-region']),
  deleteSecret: deleteSecret(config['aws-region']),
  getHighestVersion: getHighestVersion(config['aws-region']),
  getSecret: getSecret(config['aws-region'], config['secret-table']),
  listSecrets: listSecrets(config['aws-region']),
  putSecret: putSecret(config['master-cmk-alias'], config['aws-region'], config['secret-table'], config['digest'])
})
