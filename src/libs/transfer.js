const config = require('config')
const rpc = require('./rpc.js')
const colors = require('colors')
const {roundBTT , numberToPercent, log} = require('./utils.js')
const {PublicKey, PrivateKey, processKey} = require('./keys.js')

const devFeePercent = numberToPercent(config.get('DEV_FEE_PERCENT'))
const devPublicKeyUncompressed = new PublicKey('BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=').uncompressed

module.exports = async function({payerIndex, payerKey, recipientKey, amount}){
    const isPayerIndex = Number.isInteger(payerIndex)
    const payerPrivateKeyObject = new PrivateKey(payerKey)
    const recipientKeyObject = processKey(recipientKey)
    const recipientPublicKeyUncompressed = recipientKeyObject instanceof PublicKey ? recipientKeyObject.uncompressed : recipientKeyObject.public.uncompressed

    const payerBalance = (await rpc.getAccount({
        publicKeyUncompressed: payerPrivateKeyObject.public.uncompressed
    })).account.balance

    const processTransfer = async (paymentAmount, devFeeAmount) => {
        const transactions = []
        if (paymentAmount) transactions.push(rpc.signedTransfer({
            payerPrivateKeyObject,
            recipientPublicKeyUncompressed,
            amount: paymentAmount
        }))
        if (devFeeAmount) transactions.push(rpc.signedTransfer({
            payerPrivateKeyObject,
            recipientPublicKeyUncompressed: devPublicKeyUncompressed,
            amount: devFeeAmount
        }))
        const result = await Promise.all(transactions)
        log('[transfer] ' + (isPayerIndex ? `Payer #${payerIndex}: ` : '') + roundBTT(paymentAmount).toLocaleString().green + ' BTT transfered')
        return result[0]
    }

    if (payerBalance <= 0) {
        log(`[transfer]${isPayerIndex ? ` Payer #${payerIndex}:` : ''} empty balance`)
    } else if (typeof amount === 'string' & amount === 'all') {
        const devFeeAmount = Math.round(payerBalance * devFeePercent)
        const paymentAmount = payerBalance - devFeeAmount
        return await processTransfer(paymentAmount, devFeeAmount)
    } else if (typeof amount === 'number') {
        const devFeeAmount = Math.round(amount * devFeePercent)
        const paymentAmount = amount
        const requestedAmount = paymentAmount + devFeeAmount
        if (payerBalance < requestedAmount) log(`[transfer] Not enough balance`)
        else return await processTransfer(paymentAmount, devFeeAmount)
    } else log(`[transfer] Wrong amount specified`)
}