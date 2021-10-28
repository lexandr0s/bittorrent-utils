const fs = require('fs')
const {env: ENV} = require('process')
const path = require('path')
const {URL} = require('url')
const fetch = require('node-fetch')
const log = require('./log.js')
const config = require('config')

module.exports = new class BitTorrentSpeed {
    constructor() {
        this.apiUrlWithoutPort = 'http://127.0.0.1/api/'
        this.port = null
        this.token = null
        this.privateKey = null
        const clientWithBitTorrentSpeedPortFilePath = config.get('CLIENTS').find(item => typeof item.BITTORRENT_SPEED_PORT_FILE_PATH === 'string')
        if (clientWithBitTorrentSpeedPortFilePath) this.portFilePath = clientWithBitTorrentSpeedPortFilePath.BITTORRENT_SPEED_PORT_FILE_PATH
    }

    getPort = async () => {
        if (this.port !== null) return this.port        

        const portFilePath = this.portFilePath === 'auto' || this.portFilePath === undefined ? path.join(ENV.LOCALAPPDATA, '/BitTorrentHelper/port') : this.portFilePath    

        try {
            fs.accessSync(portFilePath)
        } catch (error) {
            log.debug(`${portFilePath} not found, retry in 5 seconds...`)
            await new Promise(resolve => setTimeout(resolve, 5000))
            return this.getPort()
        }

        const portFileData = fs.readFileSync(portFilePath, 'UTF-8')
        const port = parseInt(portFileData)  
        
        this.port = port

        return port
    }

    getApiUrl = async () => {
        const url = new URL(this.apiUrlWithoutPort)
        url.port = await this.getPort()
        return url
    }

    getToken = async () => {
        if (this.token !== null) return this.token
        const url = await this.getApiUrl()
        url.pathname += 'token'
        const response = await fetch(url.href)
        if (response.status !== 200) throw new Error(response.statusText)
        const token = await response.text()
        this.token = token
        return token
    }

    authorizedRequest = async (url, options) => {
        try {
            const token =  await this.getToken()
            url.searchParams.set('t', token)
            const response = await fetch(url.href, options)
            if (response.status !== 200) throw new Error(response.statusText)
            else return response.text()
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                log.debug(`${url.href} not responding, retry in 5 seconds...`)
                await new Promise(resolve => setTimeout(resolve, 5000))
                return this.authorizedRequest(url, options)
            } else {
                throw error
            }
        }
    }

    setPassword = async (password = Math.random().toString(36).slice(-8)) => {
        const url = await this.getApiUrl()
        url.pathname += 'password'
        await this.authorizedRequest(url, {
            method: 'POST',
            body: Buffer.from(password)
        })
        return password
    }

    getPrivateKey = async () => {
        const password = await this.setPassword()
        const url = await this.getApiUrl()
        url.pathname += 'private_key'
        url.searchParams.set('pw', password)
        this.privateKey = await this.authorizedRequest(url)
        return this.privateKey
    }

    disableTokensSpending = async () => {
        const url = await this.getApiUrl()
        url.pathname += 'store/spend'
        return this.authorizedRequest(url, {
            method: 'POST',
            body: Buffer.from('false')
        })
    }
}