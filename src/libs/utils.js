const process = require('process')

module.exports.numberToPercent = (number) => (number > 0 ? number > 100 ? 100 : number : 0) / 100
module.exports.roundBTT = (amount) => amount / 1000000
module.exports.log = (msg) => console.log('[' + new Date().toLocaleString("ru", {hour:'numeric', minute: 'numeric', second: 'numeric'}) + '] ' + msg)
module.exports.isProduction = process.env.NODE_ENV === 'production'