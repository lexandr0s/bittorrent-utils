const fetch = require('node-fetch')

module.exports.start = async () => {
    const start = new Date()

    const response = await fetch('https://api.trongrid.io/v1/accounts/41c109c53d081d1baf2aa792c7eef5b3a76df4f711/transactions/?limit=1&only_from=true&only_confirmed=true')
    const body = await response.json();
    const blockTimestamp = body.data[0].block_timestamp
    const lastTransactionAge = new Date() - blockTimestamp

    // console.log(body.data[0].raw_data)

    console.log(lastTransactionAge / 1000)
}

// setInterval(module.exports.start, 1000)