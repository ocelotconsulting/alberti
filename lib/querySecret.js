const getDynamoDBDocumentClient = require('./aws/sdk/getDynamoDBDocumentClient')
const winston = require('winston')

const querySecret = (region) => (TableName, name, limit) =>
  getDynamoDBDocumentClient(region).query(Object.assign({
    TableName,
    ScanIndexForward: false,
    ConsistentRead: true,
    KeyConditionExpression: '#n = :name',
    ExpressionAttributeValues: {
      ':name': name
    },
    ExpressionAttributeNames: {
      '#n': 'name'
    }
  }, (limit) ? {Limit: limit} : {})).promise()
  .then((result) => {
    if (result.Count === 0) {
      winston.error(`Item {'name': '${name}'} couldn't be found.`)
      throw new Error(`Item {'name': '${name}'} couldn't be found.`)
    }
    return result.Items
  })

module.exports = querySecret
