const path = require('path')
const config = require('config')
const colors = require('colors')
const log = require('loglevel')
const parentModule = require('parent-module')

log.setDefaultLevel(config.get('LOG_LEVEL'))

const getTimestamp = () => `[${new Date().toLocaleString("ru", {hour:'numeric', minute: 'numeric', second: 'numeric'}).yellow}]`

module.exports.trace = (msg, caller) => log.trace(getTimestamp() + ` (${'TRACE'.gray}) [${path.parse(caller || parentModule()).name}] ` + msg)
module.exports.debug = (msg, caller) => log.debug(getTimestamp() + ` (${'DEBUG'.gray}) [${path.parse(caller || parentModule()).name}] ` + msg)
module.exports.info  = (msg, caller) => log.info(getTimestamp()  + ` (${'INFO'.brightBlue}) [${path.parse(caller || parentModule()).name}] ` + msg)
module.exports.warn  = (msg, caller) => log.warn(getTimestamp()  + ` (${'WARN'.brightYellow}) [${path.parse(caller || parentModule()).name}] ` + msg)
module.exports.error = (msg, caller) => log.error(getTimestamp() + ` (${'ERROR'.brightRed}) [${path.parse(caller || parentModule()).name}] ` + msg)