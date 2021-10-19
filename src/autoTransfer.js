const config = require('config')
const colors = require('colors')
const inAppTransfer = require('./libs/inAppTransfer.js')
const ledgerRPC = require('./libs/ledgerRPC.js')
const BitTorrentSpeed = require('./libs/BitTorrentSpeed.js')
const {log, UBTTtoBTT, iteration} = require('./libs/utils.js')

const payers = config.get('AUTOTRANSFER_FROM')
const recipientKey = config.get('AUTOTRANSFER_TO')
const historyAgeHours = config.get('AUTOTRANSFER_HISTORY_AGE_HOURS')

const Hisotry = class {
    constructor(historyAgeHours) {
        this.transactions = []
        this.historyAgeMS = historyAgeHours * 60 * 60 * 1000
    }

    push(transaction) {
        this.transactions.push(transaction)
        for (let i = this.transactions.length - 1; i >= 0; i--) {
            const transactionAgeMS = Date.now() - this.transactions[i].timestamp
            if (transactionAgeMS > this.historyAgeMS) this.transactions.splice(i, 1)
        }
    }

    getGlobalProfitability = () => this.transactions.reduce((acc, transaction) => acc + transaction.paymentAmount, 0)
    getPayerProfitability = payerIndex => this.transactions.reduce((acc, transaction) => transaction.payerIndex === payerIndex ? acc + transaction.paymentAmount : acc, 0)
}

const history = new Hisotry(historyAgeHours)

const autoTransfer = async (payerPrivateKey, payerIndex) => {
    try {
        const transferResult = await inAppTransfer({
            payerIndex,
            payerPrivateKey,
            recipientKey: recipientKey,
            amount: 'all'
        })
        history.push({
            payerIndex,
            paymentAmount: transferResult.paymentAmount,
            timestamp: Date.now()
        })
        const recipientBalance = (await ledgerRPC.createAccount({
            key: recipientKey
        })).account.balance
        
        const transferLogString = `Payer #${payerIndex}: ` + UBTTtoBTT(transferResult.paymentAmount).toLocaleString().green + ' -> ' + UBTTtoBTT(recipientBalance).toLocaleString().brightGreen + ' BTT'
        
        if (!historyAgeHours) log.info(transferLogString)
        else if (historyAgeHours) {
            const globalProfit = UBTTtoBTT(history.getGlobalProfitability())
            const payerProfit = UBTTtoBTT(history.getPayerProfitability(payerIndex))
            const payerProfitPercent = Math.round(payerProfit/globalProfit*10000) / 100
            
            log.info(transferLogString + `, last ${historyAgeHours} hour(s) profit: ${payerProfit.toLocaleString().cyan} - ${(payerProfitPercent + '%').cyan} of global (${globalProfit.toLocaleString().brightCyan} BTT)`)
        }

        return
        
    } catch (error) {
        if (error.message === 'empty balance') log.debug(`Payer #${payerIndex}: ${error.message}`)
        else log.error(error)
        return
    }
}

const autoTransferIteration = (...args) => iteration(autoTransfer, config.get('AUTOTRANSFER_INTERVAL_SECONDS') * 1000, ...args)

module.exports.start = async () => {
    if (payers === 'auto') {
        const payer = await new BitTorrentSpeed().getPrivateKey()
        log.info(`Payer private key: ${payer}`)
        await Promise.all([payer].map(autoTransferIteration))
    } else {
        await Promise.all(payers.map(autoTransferIteration))
    }
}

