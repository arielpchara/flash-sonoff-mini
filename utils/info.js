const {command} = require('./command')

function getInfo({address, id}) {
  return command(address, id, 'info').then( response => JSON.parse(response.data) )
}

module.exports = {
  getInfo
}