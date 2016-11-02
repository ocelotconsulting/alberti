const getDynamoDB = require('./aws/sdk/getDynamoDB')

const createTable = (region) => (TableName) =>
  getDynamoDB(region).createTable({
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
    getDynamoDB(region).waitFor('tableExists', {
      TableName
    }).promise()
  )

module.exports = createTable
