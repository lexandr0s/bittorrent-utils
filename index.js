const config = require('config')

try {
    if (config.get('AUTOTRANSFER_INTERVAL_SECONDS')) require('./src/autoTransfer.js').start()
    if (config.get('AUTOREMOVE_INTERVAL_SECONDS')) require('./src/autoRemove.js').start()
    if (config.get('AUTOWITHDRAW_INTERVAL_SECONDS')) require('./src/autoWithdraw.js').start()
} catch (error) {
    console.error(error)
}