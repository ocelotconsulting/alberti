const getDynamoDBDocumentClient = require('./aws/sdk/getDynamoDBDocumentClient')
const querySecret = require('./querySecret')

const deleteSecret = (region) => (TableName, name) =>
  querySecret(region)(TableName, name)
  .then((items) =>
    Promise.all(items.map(item =>
      getDynamoDBDocumentClient(region).delete({
        TableName,
        Key: { name: item['name'], version: item['version'] }
      }).promise()
    ))
  )

module.exports = deleteSecret
