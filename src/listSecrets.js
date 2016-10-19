const getDynamoDBDocumentClient = require('./aws/sdk/getDynamoDBDocumentClient')
const winston = require('winston')

const listSecrets = (TableName) =>
  getDynamoDBDocumentClient().scan({
    TableName,
    ExpressionAttributeNames: {
      '#n': 'name'
    },
    ProjectionExpression: '#n, version'
  }).promise()
  .then((result) => {
    if (!result.Items) {
      winston.error(`No items found in table.`)
      throw new Error(`No items found in table.`)
    }
    return result.Items
  })

module.exports = listSecrets
