const path = require('path')
const config = require('config')
const BitTorrent = require('./libs/BitTorrent.js')
const {isProduction, log} = require('./libs/utils.js')

const clients = Promise.all(config.get('CLIENTS').map(async client => {
    const bitTorrent = await new BitTorrent({
        guiUrl: client.GUI_URL,
        username: client.USERNAME,
        password: client.PASSWORD
    }).login()
    bitTorrent.quota = client.GB_QUOTA * 1024 * 1024 * 1024
    return bitTorrent
}))

const bytesToGB = (bytes) => Math.round(bytes / 1024 / 1024 / 1024 * 100) / 100

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

async function autoRemove(client, clientIndex) {
    const list = await client.getList()
    const listsByDisk = getlistsByDisk(list)

    for (let disk in listsByDisk) {
        const totalSize = listsByDisk[disk].totalSize

        if (totalSize > client.quota) {
            const sortedList = sortTorrents(listsByDisk[disk].torrents)
            const exccess = totalSize - client.quota
            const torrentsToRemove = []

            do {
                const torrent = sortedList.pop()
                
                if (torrent.coefficient === 0) continue

                torrentsToRemove.push(torrent)

            } while (torrentsToRemove.reduce((acc, torrent) => acc += torrent.size, 0) < exccess)

            log(`[autoRemove] Client #${clientIndex}, disk ${disk}, exccess ${bytesToGB(exccess)}GB, removing torrents:`)

            console.table(torrentsToRemove.map(t => ({name: t.name,
                disk: disk,
                size: bytesToGB(t.size) + ' GB',
                ratio: t.ratio / 1000, seedsRatio: t.seedsRatio,
                coefficient: t.coefficient
            })))

            if (!config.get('AUTOREMOVE_PREVENT_REMOVING')) await client.deleteTorrents(torrentsToRemove.map(t => t.hash))

        } else log(`[autoRemove] Client #${clientIndex}, disk ${disk}, total size ${bytesToGB(totalSize)}GB: no exccess`)
    }
}

module.exports.start = async function() {
    const autoRemoveIteration = async () => Promise.all((await clients).map(autoRemove))
    isProduction ? setInterval(autoRemoveIteration, config.get('AUTOREMOVE_INTERVAL_SECONDS') * 1000) : autoRemoveIteration()
}