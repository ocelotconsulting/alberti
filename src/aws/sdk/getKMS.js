const AWS = require('aws-sdk')
const getCredentialsObject = require('./getCredentialsObject')

module.exports = () => new AWS.KMS(getCredentialsObject())
