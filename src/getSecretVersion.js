const getDynamoDB = require('./aws/sdk/getDynamoDB')
const winston = require('winston')

const getSecretVersion = (version) => (TableName, name) =>
  getDynamoDB().get({
    TableName,
    Key: {
      name,
      version: ('0000000000000000000' + version).slice(-19)
    }
  }).promise()
  .then((result) => {
    if (!result.Item) {
      winston.error(`Item {'name': '${name}', 'version': '${version}'} couldn't be found.`)
      throw new Error(`Item {'name': '${name}', 'version': '${version}'} couldn't be found.`)
    }
    return result.Item
  })

module.exports = getSecretVersion
