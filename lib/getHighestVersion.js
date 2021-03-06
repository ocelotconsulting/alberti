const getDynamoDBDocumentClient = require('./aws/sdk/getDynamoDBDocumentClient')
const winston = require('winston')

const getHighestVersion = (region) => (TableName, name) =>
  getDynamoDBDocumentClient(region).query({
    TableName,
    Limit: 1,
    ScanIndexForward: false,
    ConsistentRead: true,
    KeyConditionExpression: '#n = :name',
    ExpressionAttributeValues: {
      ':name': name
    },
    ExpressionAttributeNames: {
      '#n': 'name'
    },
    ProjectionExpression: 'version'
  }).promise()
  .then((result) => {
    if (result.Count === 0) {
      winston.error(`Item {'name': '${name}'} couldn't be found.`)
      throw new Error(`Item {'name': '${name}'} couldn't be found.`)
    }
    return result.Items[0]['version']
  })

module.exports = getHighestVersion
