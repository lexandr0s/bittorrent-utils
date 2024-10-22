const config = require('config')
const BitTorrent = require('./libs/BitTorrent.js')
const {log} = require('./libs/utils.js')

const getClient = async (credentials, clientIndex) => {
    try {
        const client = await new BitTorrent({
            guiUrl: credentials.GUI_URL,
            username: credentials.USERNAME,
            password: credentials.PASSWORD
        }).login()
        log.info(`Cleint #${clientIndex} logged in as ${credentials.USERNAME}`)
        client.settings = {...config.get('AUTOCONFIG_SETTINGS'), ...credentials.SETTINGS}
        return client
    } catch (error) { 
        log.error(`Cleint #${clientIndex}: ${error.message}`)
        return null
    }
}

const setSettings = async (client, clientIndex) => {
    try {
        await client.setSettings(client.settings)
        log.info(`Client #${clientIndex} settings applied`)
    } catch (error) {
        log.error(`Client #${clientIndex}: ${error.message}`)
    }
}

module.exports.start = async () => {
    const clients = await Promise.all(config.get('CLIENTS').map(getClient))
    await Promise.all(clients.filter(client => client !== null).map(setSettings))
}