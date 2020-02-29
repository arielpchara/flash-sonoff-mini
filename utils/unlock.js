const {command} = require('./command')

// curl http://192.168.0.108:8081/zeroconf/ota_unlock -XPOST --data '{"deviceid":"1000b72703","data":{} }'


function unlockOTA({address, id}) {
  return command(address, id, 'ota_unlock')
}

module.exports = {
  unlockOTA
}