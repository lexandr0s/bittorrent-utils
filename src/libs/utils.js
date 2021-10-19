const process = require('process')
const path = require('path')
const config = require('config')
const colors = require('colors')
const log = require('loglevel')
const parentModule = require('parent-module')

module.exports.isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'containerized'
module.exports.numberToPercent = (number) => (number > 0 ? number > 100 ? 100 : number : 0) / 100
module.exports.UBTTtoBTT = (amount) => amount / 1000000
module.exports.BTTtoUBTT = (amount) => amount * 1000000

module.exports.iteration = async function (func, delay, ...args) {
    if (!module.exports.isProduction) try {
        return await func(...args)
    } catch (error) {
        module.exports.log.error(error.stack, func.name)
    } else try {
        await func(...args)
    } catch (error) {
        module.exports.log.error(error.stack, func.name)
    } finally {
        await new Promise(resolve => setTimeout(resolve, delay))
        return await module.exports.iteration(func, delay, ...args)
    }
}

module.exports.log = (function() {
    const getTimestamp = () => `[${new Date().toLocaleString("ru", {hour:'numeric', minute: 'numeric', second: 'numeric'}).yellow}]`
    log.setDefaultLevel(config.get('LOG_LEVEL'))

    this.trace = (msg, caller) => log.trace(getTimestamp() + ` (${'TRACE'.gray}) [${path.parse(caller || parentModule()).name}] ` + msg)
    this.debug = (msg, caller) => log.debug(getTimestamp() + ` (${'DEBUG'.gray}) [${path.parse(caller || parentModule()).name}] ` + msg)
    this.info  = (msg, caller) => log.info(getTimestamp()  + ` (${'INFO'.brightBlue}) [${path.parse(caller || parentModule()).name}] ` + msg)
    this.warn  = (msg, caller) => log.warn(getTimestamp()  + ` (${'WARN'.brightYellow}) [${path.parse(caller || parentModule()).name}] ` + msg)
    this.error = (msg, caller) => log.error(getTimestamp() + ` (${'ERROR'.brightRed}) [${path.parse(caller || parentModule()).name}] ` + msg)

    return this
})()
