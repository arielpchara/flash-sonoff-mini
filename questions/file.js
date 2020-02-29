module.exports = {
  type: 'fuzzypath',
  name: 'filename',
  message: 'Select a bin file:',
  default: 'tasmota',
  depthLimit: 0,
  excludePath: nodePath => nodePath.startsWith('node_modules')
}