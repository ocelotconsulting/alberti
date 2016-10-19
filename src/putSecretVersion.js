const getDynamoDB = require('./aws/sdk/getDynamoDB')

const putSecretVersion = (TableName, Item, ConditionExpression) =>
  getDynamoDB().put({
    TableName,
    Item,
    ConditionExpression,
    ExpressionAttributeNames: {
      '#n': 'name'
    }
  }).promise()

module.exports = putSecretVersion
