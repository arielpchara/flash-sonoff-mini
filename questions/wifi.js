const { isConnected } = require('../utils')

module.exports = [
  {
    type: 'confirm',
    name: 'wifi',
    message: `No internet connection!\nConfigure WI-FI?`,
    when: async () => {
      const internet = await isConnected()
      console.log('internet connection', internet)
      return !internet
    }
  },
  {
    type: 'input',
    name: 'ssid',
    message: 'SSID (2.4GHz)',
    when: ({wifi}) => !!wifi
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password',
    when: ({ssid}) => !!ssid
  },
  {
    type: 'confirm',
    name: 'confirmWiFi',
    message: ({ssid, password}) => `Configure WiFi: ${ssid}|${password}`,
    when: ({ssid, password}) => !!ssid && !!password
  }
]