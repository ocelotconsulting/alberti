const getDynamoDBDocumentClient = require('./aws/sdk/getDynamoDBDocumentClient')

const putSecretVersion = (TableName, Item, ConditionExpression) =>
  getDynamoDBDocumentClient().put({
    TableName,
    Item,
    ConditionExpression,
    ExpressionAttributeNames: {
      '#n': 'name'
    }
  }).promise()

module.exports = putSecretVersion
