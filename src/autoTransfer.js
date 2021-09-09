const process = require('process')
const config = require('config')
const transfer = require('./libs/transfer.js')

const isProduction = process.env.NODE_ENV === 'production'

const payers = config.get('PAYERS')
const recipient = config.get('RECIPIENT')

const autoTransfer = (payer, payerIndex) => transfer({
    payerIndex,
    payerKey: payer,
    recipientKey: recipient,
    amount: 'all'
})

module.exports.start = function() {
    const autoTransferIteration = () => Promise.all(payers.map(autoTransfer))
    isProduction ? setInterval(autoTransferIteration, config.get('AUTOTRANSFER_INTERVAL_SECONDS') * 1000) : autoTransferIteration()
}