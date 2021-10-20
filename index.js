const config = require('config')
const process = require('process')
const log = require('./src/libs/log.js')

log.info(`Environment: ${process.env.NODE_ENV}`)

Promise.all([
    config.get('AUTOTRANSFER_INTERVAL_SECONDS') ? require('./src/autoTransfer.js').start()  : null,
    config.get('AUTOREMOVE_INTERVAL_SECONDS')   ? require('./src/autoRemove.js').start()    : null,
    config.get('PEERS_FILTER_INTERVAL_SECONDS') ? require('./src/peersFilter.js').start()   : null,
    config.get('AUTOCONFIG_ENABLE')             ? require('./src/autoConfig.js').start()    : null,
]).catch(error => {
    console.error(error)
})