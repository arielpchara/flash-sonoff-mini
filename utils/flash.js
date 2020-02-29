// curl http://192.168.0.108:8081/zeroconf/ota_flash -XPOST --data '{"deviceid":"<deviceID>","data":{"downloadUrl": "http://192.168.0.106:8080/tasmota-lite.bin", "sha256sum": "aa413f499233901f74502558561a1304e2a3d7ab72259740b377f52775adbb5d"} }'
const crypto = require('crypto')
const { readFileSync } = require('fs')
const path = require('path')
const { networkInterfaces } = require('os')

const { createOTAServer } = require('./http')
const { getInfo} = require('./info')
const { unlockOTA } = require('./unlock')
const { command } = require('./command')

const hash = crypto.createHash('sha256');

const interfaces = Object.values(networkInterfaces())
  .flat()
  .filter( details => details.family === 'IPv4' )
  .filter( details => !details.internal )

const ip = interfaces[0].address

async function otaFlash(device, filename) {
  return new Promise( resolve => {
    const file = readFileSync(path.resolve(filename))
    const sha256sum = hash.update(file).digest('hex')
    const handleFinish = () => {
      console.log('Upload finish!')
      resolve()
    }
    await createOTAServer(path.resolve(filename), handleFinish)
    const info = await getInfo(device)
    if( !info.otaUnlock ) {
      await unlockOTA(device)
    }
    command(device.address, device.id, 'ota_flash', {
      downloadUrl: `http://${ip}:8321/public/${filename}`,
      sha256sum
    })
  })
}

module.exports = {
  otaFlash
}