const winston = require('winston')

const localContext = {
  succeed: (data) => {
    console.log(`Received result ${JSON.stringify(data)}`)
    process.exit(0)
  }
}

const localPromise = (promise) =>
  promise
  .then((result) => {
    localContext.succeed(result)
  })
  .catch((e) => winston.error(`Received error ${e.stack}`))

module.exports = localPromise
