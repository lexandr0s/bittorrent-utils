const config = require('config')
const {log} = require('./src/libs/utils.js')

try {
    if (config.get('AUTOTRANSFER_INTERVAL_SECONDS')) require('./src/autoTransfer.js').start()
    if (config.get('AUTOREMOVE_INTERVAL_SECONDS')) require('./src/autoRemove.js').start()
    if (config.get('PEERS_FILTER_INTERVAL_SECONDS')) require('./src/peersFilter.js').start()
    if (config.get('AUTOCONFIG_ENABLE')) require('./src/autoConfig.js').start()
} catch (error) {
    log.error(error)
}