const config = require('config')
const ledgerRPC = require('./ledgerRPC.js')
const {numberToPercent} = require('./utils.js')

const devFeePercent = numberToPercent(config.get('DEV_FEE_PERCENT'))
const devPublicKey = 'BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0='

module.exports = async function({payerPrivateKey, recipientKey, amount}){
    const payerBalance = (await ledgerRPC.createAccount({
        key: payerPrivateKey
    })).account.balance

    const processTransfer = async (paymentAmount, devFeeAmount) => {
        const transactions = []
        if (paymentAmount) transactions.push(ledgerRPC.transfer({
            payerPrivateKey: payerPrivateKey,
            recipientKey: recipientKey,
            amount: paymentAmount
        }))
        if (devFeeAmount) transactions.push(ledgerRPC.transfer({
            payerPrivateKey: payerPrivateKey,
            recipientKey: devPublicKey,
            amount: devFeeAmount
        }))
        const result = await Promise.all(transactions)
        return {
            paymentAmount,
            payerNewBalance: result[0].balance
        }
    }

    if (payerBalance <= 0) throw new Error('empty balance')
    else if (typeof amount === 'string' && amount === 'all') {
        const devFeeAmount = Math.round(payerBalance * devFeePercent)
        const paymentAmount = payerBalance - devFeeAmount
        return await processTransfer(paymentAmount, devFeeAmount)
    } else if (typeof amount === 'number') {
        const devFeeAmount = Math.round(amount * devFeePercent)
        const paymentAmount = amount
        const requestedAmount = paymentAmount + devFeeAmount
        if (payerBalance < requestedAmount) throw new Error(`not enough balance`)
        else return await processTransfer(paymentAmount, devFeeAmount)
    } else throw new Error(`wrong amount specified`)
}