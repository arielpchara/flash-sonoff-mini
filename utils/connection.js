const internetAvailable = require('internet-available')
function isConnected() {
  return new Promise((resolve) => internetAvailable({
    timeout: 1000
    })
    .then(() => resolve(true))
    .catch(() => resolve(false))
  )
}

module.exports = {
  isConnected
}