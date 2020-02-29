const ora = require('ora')

const { createBrowser, ServiceType } = require('mdns')
const { getInfo } = require('../utils')

const SERVICE_NAME = '_ewelink._tcp.'

const serviceType = new ServiceType(SERVICE_NAME)

function getDevices() {
  const browser = createBrowser(serviceType)
  const devices = []
  return new Promise( resolve => {
    browser.on('serviceUp', function(service) {
      devices.push({
        name: `${service.name} - ${service.addresses}`,
        value: {
          id: service.txtRecord.id,
          address: service.addresses[0]
        }
      })
    });
    browser.start();
    setTimeout(() => {
      resolve(devices)
    }, 1000)
  })
}

module.exports = {
  type: 'list',
  name: 'device',
  message: 'Devices founded:',
  choices: async () => {
    const devices = await getDevices()
    if(!devices.length) {
      console.error('Device Not Founded')
      process.exit()
    }
    return devices
  }
}