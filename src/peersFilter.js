const fs = require('fs')
const path = require('path')
const process = require('process')
const config = require('config')
const semver = require('semver')
const BitTorrent = require('./libs/BitTorrent.js')
const {iteration} = require('./libs/utils.js')
const log = require('./libs/log.js')

const getClient = async (credentials, clientIndex) => {
    try {
        if (!credentials.IPFILTER_FILE_PATH) return null
        const client = await new BitTorrent({
            guiUrl: credentials.GUI_URL,
            username: credentials.USERNAME,
            password: credentials.PASSWORD
        }).login()
        log.info(`Cleint #${clientIndex} logged in as ${credentials.USERNAME}`)
        if (credentials.IPFILTER_FILE_PATH === 'auto') client.ipfilterFilePath = path.join(process.env.APPDATA, "BitTorrent/ipfilter.dat")
        else client.ipfilterFilePath = credentials.IPFILTER_FILE_PATH
        fs.accessSync(path.dirname(client.ipfilterFilePath))
        return client
    } catch (error) { 
        log.error(`Cleint #${clientIndex}: ${error.message}`)
        return null
    }
}

const filterPeers = async (client, clientIndex) => {
    const torrentList = await client.getList()
    const peerList = await client.getPeers(torrentList.map(torrent => torrent.hash))
    const parseVersion = (clientName) => {
        const match = clientName.match(/\d+\.\d+\.\d+/)
        return match ? match[0] : null
    }
    const peersToBan = peerList.reduce((acc, peer) => {
        if (peer.client.startsWith('μTorrent') && semver.satisfies(parseVersion(peer.client), config.get('PEERS_FILTER_UTORRENT_VERSION'))) return acc
        else if (peer.client.startsWith('BitTorrent') && semver.satisfies(parseVersion(peer.client), config.get('PEERS_FILTER_BITTORRENT_VERSION'))) return acc
        else if (peer.client.startsWith('libtorrent') && semver.satisfies(parseVersion(peer.client), config.get('PEERS_FILTER_LIBTORRENT_VERSION'))) return acc
        else return [...acc, peer]
    }, [])
    if (peersToBan.length) {
        try {
            const bannedIps = (fs.readFileSync(client.ipfilterFilePath, 'utf-8')).split('\n').filter(ip => ip !== '')
            const newBannedIps = bannedIps.concat(peersToBan.map(peer => peer.ip))
            if (newBannedIps.length > config.get('PEERS_FILTER_BANLIST_MAX_LENGTH')) newBannedIps.splice(0, newBannedIps.length - config.get('PEERS_FILTER_BANLIST_MAX_LENGTH'))
            fs.writeFileSync(client.ipfilterFilePath, newBannedIps.join('\n'))
            await client.setSettings({'ipfilter.enable': false})
            await client.setSettings({'ipfilter.enable': true})
            log.info(`Client #${clientIndex}: ${peerList.length} peer(s), ${peersToBan.length.toLocaleString()} new ban(s) (${(newBannedIps.length).toLocaleString()}/${config.get('PEERS_FILTER_BANLIST_MAX_LENGTH')}): ${peersToBan.map(peer => peer.client).join(', ')}`)
        } catch (error) {
            if (error.code === 'ENOENT') {
                fs.writeFileSync(client.ipfilterFilePath, '')
                log.debug(`Client #${clientIndex}: ipfilter.dat file created`)
            }
            else throw error
        }
    } else {
        log.debug(`Client #${clientIndex}: no peers to ban`)
    }
}

const filterPeersIteration = (...args) => iteration(filterPeers, config.get('PEERS_FILTER_INTERVAL_SECONDS') * 1000, ...args)

module.exports.start = async () => {
    const clients = await Promise.all(config.get('CLIENTS').map(getClient))
    await Promise.all(clients.filter(client => client !== null).map(filterPeersIteration))
}