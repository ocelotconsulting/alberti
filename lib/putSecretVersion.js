const getDynamoDBDocumentClient = require('./aws/sdk/getDynamoDBDocumentClient')

const putSecretVersion = (region) => (TableName, Item, ConditionExpression) =>
  getDynamoDBDocumentClient(region).put({
    TableName,
    Item,
    ConditionExpression,
    ExpressionAttributeNames: {
      '#n': 'name'
    }
  }).promise()

module.exports = putSecretVersion
