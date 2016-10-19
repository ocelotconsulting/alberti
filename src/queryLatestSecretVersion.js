const querySecret = require('./querySecret')

const queryLatestSecretVersion = (TableName, name) =>
  querySecret(TableName, name, 1)
  .then((items) => items[0])

module.exports = queryLatestSecretVersion
