const express = require('express')
const { createServer } = require('http')
const { networkInterfaces } = require('os')
// const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

function createOTAServer(filename, onFinish = () => null) {
  return new Promise(resolve => {
    const app = express()
    app.use(morgan('dev'))
    app.use('/public', express.static( path.dirname(filename) ))
    app.post('/api/device/otaFlash', (req, res) => {
      onFinish()
      res.send({ok: true})
    })
    app.listen(8321, () => resolve(app))
  })
}

module.exports = {
  createOTAServer
}