const getDynamoDB = require('./aws/sdk/getDynamoDB')

const createTable = (TableName) =>
  getDynamoDB().createTable({
    TableName,
    KeySchema: [
      {
        AttributeName: 'name',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'version',
        KeyType: 'RANGE'
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'name',
        AttributeType: 'S'
      },
      {
        AttributeName: 'version',
        AttributeType: 'S'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }).promise()
  .then((quickResp) =>
    getDynamoDB().waitFor('tableExists', {
      TableName
    }).promise()
  )

module.exports = createTable
