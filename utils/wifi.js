const {command} = require('./command')

// { "ssid": "gatuzas_house", "password": "elatem@@" }

function configWiFi({address, id}, data) {
  return command(address, id, 'wifi', data)
}

module.exports = {
  configWiFi
}