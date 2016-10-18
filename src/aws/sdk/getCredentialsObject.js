const config = require('../../../config/default.json')

module.exports = (data) => ({
  region: config['aws-region']
})
