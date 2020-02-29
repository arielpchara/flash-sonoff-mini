const { request } = require('http')

function command(address, id, action, data = {}) {
  return new Promise((resolve, reject) => {
    console.log(`http://${address}:8081/zeroconf/${action}`, JSON.stringify({deviceid:id,data}))
    const req = request(`http://${address}:8081/zeroconf/${action}`, {
      method: 'POST',
      timeout: 1000
    }, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', reject)
    req.on('finish', () => {
    })
    req.end(JSON.stringify({deviceid:id,data}), 'utf8')
  })
}

module.exports = {
  command
}