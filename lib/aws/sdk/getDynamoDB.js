const AWS = require('aws-sdk')
const getCredentialsObject = require('./getCredentialsObject')

module.exports = (region) => new AWS.DynamoDB(getCredentialsObject(region))
