const inquirer = require('inquirer')
const questions = require('./questions')
const { configWiFi, otaFlash } = require('./utils')

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))

inquirer
  .prompt(questions)
  .then(async ({confirmWiFi, device, ssid, password, filename}) => {
    if( confirmWiFi ) {
      return await configWiFi(device, {ssid, password})
    }
    return otaFlash(device, filename)
  })
  .catch( err => console.error(err) )