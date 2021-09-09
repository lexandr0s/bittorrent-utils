const fetch = require('node-fetch')
const URL = require('url').URL
const {isProduction} = require('./libs/utils.js')
const config = require('config')

const url = new URL('https://api.trongrid.io/v1/accounts/TTZu7wpHa9tnQjFUDrsjgPfXE7fck7yYs5/transactions/')
url.searchParams.set('limit', 1)
url.searchParams.set('only_from', true)
// url.searchParams.set('only_confirmed', true)
// url.searchParams.set('min_timestamp', new Date() - 100000)
url.searchParams.set('order_by', 'timestamp,desc')

async function autoWidthdraw() {
    const response = await fetch(url.href)
    const body = await response.json();
    
    if (body.data.length) {
        const transaction = body.data[0]
        console.log((new Date() - transaction.block_timestamp) / 1000, transaction.txID)
    } else {
        console.log(response.statusText)
    }

}

module.exports.start = async () => {
    setInterval(autoWidthdraw, config.get('AUTOWITHDRAW_INTERVAL_SECONDS') * 1000)
}
