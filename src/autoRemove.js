const path = require('path')
const config = require('config')
const BitTorrent = require('./libs/BitTorrent.js')
const {iteration, log} = require('./libs/utils.js')

const bytesToGB = (bytes) => bytes / 1000 / 1000 / 1000
const GBtoBytes = (gb) => gb * 1000 * 1000 * 1000

const getClient = async (credentials, clientIndex) => {
    try {
        const client = await new BitTorrent({
            guiUrl: credentials.GUI_URL,
            username: credentials.USERNAME,
            password: credentials.PASSWORD
        }).login()
        log.info(`Cleint #${clientIndex} logged in as ${client.USERNAME}`)
        client.quota = GBtoBytes(credentials.SPACE_QUOTA_PER_DRIVE_GB ? credentials.SPACE_QUOTA_PER_DRIVE_GB : config.get('AUTOREMOVE_SPACE_QUOTA_PER_DRIVE_GB'))
        return client
    } catch (error) { 
        log.error(`Cleint #${clientIndex}: ${error.message}`)
        return null
    }
}

const getlistsByDisk = (list) => list.reduce((acc, torrent) => {
    const torrentRoot = path.parse(torrent.path).root
    if (!acc[torrentRoot]) {
        acc[torrentRoot] = {
            torrents: [torrent],
            totalSize: torrent.size
        }
    } else {
        acc[torrentRoot].torrents.push(torrent)
        acc[torrentRoot].totalSize += torrent.size
    }
    return acc
}, {})

const sortTorrents = (list) => list.map(item => {
    const seedingDurationDays = (Date.now() / 1000 - item.added) / 60 / 60 / 24
    const uploadRatio = item.ratio / 1000
    const seedsRatio = item.seedsInSwarm / item.peersInSwarm
    if (!seedsRatio) item.coefficient = 0
    else item.coefficient = Math.round(uploadRatio / seedsRatio * 100000 / Math.pow(seedingDurationDays + 1, 2)) / 1000
    item.seedsRatio = Math.round(seedsRatio * 1000) / 1000
    return item
}).sort((a, b) => b.coefficient - a.coefficient)

const autoRemove = async (client, clientIndex) => {
    const list = await client.getList()
    const listsByDisk = getlistsByDisk(list)
    for (let drive in listsByDisk) {
        const totalSize = listsByDisk[drive].totalSize
        if (totalSize > client.quota) {
            const sortedList = sortTorrents(listsByDisk[drive].torrents)
            const exccess = totalSize - client.quota
            const torrentsToRemove = []
            do {
                const torrent = sortedList.pop()
                if (torrent.coefficient === 0) continue
                torrentsToRemove.push(torrent)
            } while (torrentsToRemove.reduce((acc, torrent) => acc += torrent.size, 0) < exccess)
            log.info(`Client #${clientIndex}, ${drive} - ${bytesToGB(totalSize).toFixed(2)}/${bytesToGB(client.quota).toFixed(2)}GB, exccess ${bytesToGB(exccess).toFixed(2)}GB, torrents to remove:`)
            console.table(torrentsToRemove.map(t => ({name: t.name,
                drive: drive,
                size: bytesToGB(t.size).toFixed(2) + ' GB',
                ratio: t.ratio / 1000, seedsRatio: t.seedsRatio,
                coefficient: t.coefficient,
                added: new Date(t.added * 1000).toLocaleString()
            })))
            if (!config.get('AUTOREMOVE_PREVENT_REMOVING')) return await client.deleteTorrents(torrentsToRemove.map(t => t.hash))
        } else {
            log.debug(`Client #${clientIndex}, drive ${drive} - ${bytesToGB(totalSize).toFixed(2)}/${bytesToGB(client.quota).toFixed(2)}GB`)
        }
    }
    return
}

const autoRemoveIteration = (...args) => iteration(autoRemove, config.get('AUTOREMOVE_INTERVAL_SECONDS') * 1000, ...args)

module.exports.start = async () => {
    const clients = await Promise.all(config.get('CLIENTS').map(getClient))
    await Promise.all(clients.filter(client => client !== null).map(autoRemoveIteration))
}