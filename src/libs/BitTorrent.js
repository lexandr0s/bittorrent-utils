const URL = require('url').URL
const fetch = require('node-fetch')
const log = require('./log.js')

module.exports = class {
    constructor({guiUrl, username, password}) {
        this.guiUrl = guiUrl
        this.username = username
        this.password = password
        this.token = null
        this.guid = null
    }

    async login() {
        const url = new URL('token.html', this.guiUrl)
        if (!this.loginFirtRunTime) this.loginFirtRunTime = new Date()
        
        try {
            const response = await fetch(url.href, {
                headers: {Authorization: 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')}
            })
            if (response.status !== 200) throw new Error(response.statusText)
            const responseBody = await response.text()
            this.guid = response.headers.get('set-cookie').match(/(?<=GUID=)\S+?(?=\b)/)[0]
            this.token = responseBody.match(/(?<=>)\S+?(?=<)/)[0]
            return this
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                log.debug(`${url.href} not responding, retry in 5 seconds...`)
                await new Promise(resolve => setTimeout(resolve, 5000))
                return this.login()
            } else {
                throw error
            }
        }
    }

    async authorizedRequest(url) {
        if (this.token === null || this.guid === null) await this.login()
        url.searchParams.set('token', this.token)
        const response = await fetch(url.href, { headers: {
            Authorization: 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64'),
            Cookie: `GUID=${this.guid}`
        }})
        if (response.status === 200) return response.json()
        else {
            const errorMessage = `response status ${response.status} - ` + (await response.text()).replace(/(\r\n|\n|\r)/gm, '') + ', trying to relogin...'
            await this.login()
            throw new Error(errorMessage)
        }
    }

    async getList() {
        const url = new URL(this.guiUrl)
        url.searchParams.set('list', 1)
        const list = await this.authorizedRequest(url)
        return list.torrents.map(item => ({
            hash: item[0],
            status: item[1],
            name: item[2],
            size: item[3],
            percentProgress: item[4],
            downloaded: item[5],
            uploaded: item[6],
            ratio: item[7],
            uploadSpeed: item[8],
            downloadSpeed: item[9],
            eta: item[10],
            label: item[11],
            peersConnected: item[12],
            peersInSwarm: item[13],
            seedsConnected: item[14],
            seedsInSwarm: item[15],
            availability: item[16],
            torrentOrder: item [17],
            remaining: item[18],
            added: item[23],
            path: item[26],
        }))
    }

    async getPeers(hashes) {
        const url = new URL(this.guiUrl)
        if (!Array.isArray(hashes)) hashes = [hashes]
        url.searchParams.set('action', 'getpeers')
        for (let hash of hashes) url.searchParams.append('hash', hash)
        const response = await this.authorizedRequest(url)
        if (response.peers) return response.peers.filter(item => Array.isArray(item) && item.length).flat().map(peer => ({
            region: peer[0],
            ip: peer[1],
            resolvedIp: peer[2],
            client: peer[5],
            flags: peer[6],
        }))
        else return []
    }

    async deleteTorrents(hashes, deleteFiles = true) {
        const url = new URL(this.guiUrl)
        if (!Array.isArray(hashes)) hashes = [hashes]
        if (deleteFiles) url.searchParams.set('action', 'removedata')
        else url.searchParams.set('action', 'remove')
        for (let hash of hashes) url.searchParams.append('hash', hash)
        return await this.authorizedRequest(url)
    }

    async getSettings() {
        const url = new URL(this.guiUrl)
        url.searchParams.set('action', 'getsettings')
        return (await this.authorizedRequest(url)).settings
    }

    async setSettings(settings) {
        const url = new URL(this.guiUrl)
        url.searchParams.set('action', 'setsetting')
        for (let option in settings) {
            url.searchParams.append('s', option)
            url.searchParams.append('v', settings[option])
        }
        return await this.authorizedRequest(url)
    }
}