const AWS = require('aws-sdk')
const getCredentialsObject = require('./getCredentialsObject')

module.exports = (data) => new AWS.DynamoDB.DocumentClient(getCredentialsObject())
