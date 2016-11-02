const querySecret = require('./querySecret')

const queryLatestSecretVersion = (region) => (TableName, name) =>
  querySecret(region)(TableName, name, 1)
  .then((items) => items[0])

module.exports = queryLatestSecretVersion
