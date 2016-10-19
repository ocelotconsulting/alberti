const getDynamoDBDocumentClient = require('./aws/sdk/getDynamoDBDocumentClient')
const querySecret = require('./querySecret')

const deleteSecret = (TableName, name) =>
  querySecret(TableName, name)
  .then((items) =>
    Promise.all(items.map(item =>
      getDynamoDBDocumentClient().delete({
        TableName,
        Key: { name: item['name'], version: item['version'] }
      }).promise()
    ))
  )

module.exports = deleteSecret
